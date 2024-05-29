const db= require('../db')
const {io} = require('../server')

const ReservationModel = {
   addReservation: (values) => {
      //console.log(values)
      return new Promise((resolve, reject) => {
        const insertReservationQuery = "INSERT INTO reservation (nameUser, nameEquipement, NumSerie, email, categorie, etat) VALUES (?, ?, ?, ?, ?, 'En attente')";
        const selectAdminIdQuery = "SELECT id FROM sign WHERE role = 'admin' ";
        
        db.query(insertReservationQuery, values, (err, data) => {
          if (err) {
            console.error(err);
            reject("Erreur lors de l'ajout de la réservation.");
          }
          const reservationId = data.insertId;
          db.query(selectAdminIdQuery, (err, rows) => {
            if (err) {
              console.error(err);
              reject("Erreur lors de la sélection de l'ID de l'administrateur.");
            }
            if (rows.length > 0) {
              const adminId = rows[0].id;
              if (adminId) {
               // const reservation = { reservationId , ...values , type: 'reservation' };
               const reservation = {
                nameUser: values[0],
                nameEquipement: values[1],
                NumSerie: values[2],
                email: values[3],
                categorie: values[4],
                reservationId,
                type: 'reservation'
                };
                
                io.to(adminId).emit('nouvelle_reservation_admin', reservation);
                resolve("Réservation ajoutée avec succès.");
                console.log(reservation)
                console.log("reservationId", reservationId)
              } else {
                console.error("ID de l'administrateur non trouvé.");
                reject("ID de l'administrateur non trouvé.");
              }
            } else {
              console.error("Aucun administrateur trouvé.");
              reject("Aucun administrateur trouvé.");
            }
          });
        });
      });
    },
    getAllReservation: () => {
      return new Promise((resolve, reject) => {
        const selectReservatioQuery = "SELECT * FROM reservation ORDER BY id DESC";
          db.query(selectReservatioQuery ,  (err, reservation) => {
            if (err) {
              console.error('Erreur lors de la récupération des reservations :', err);
              reject("Erreur lors de la récupération des réservations.");
            }
            resolve(reservation);
          });
      });
    },

    getReservationDetails: (reservationId) => {
      console.log(reservationId)
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM reservation WHERE id = ?";
        db.query(query, [reservationId], (err, reservation) => {
          console.log(reservation)
          if (err) {
            console.error('Erreur lors de la récupération des détails de la réclamation :', err);
            reject("Erreur lors de la récupération des détails de la réclamation.");
          }
          if (!reservation || reservation.length === 0) {
            reject("Réclamation non trouvée.");
          } else {
            resolve(reservation[0]);
          }
        });
      });
    },
    acceptReservation: (id, status, callback) => {
      db.beginTransaction((err) => {
        if (err) { callback(err, null); return; }
    
        // 1. Mettre à jour le statut de la réservation
        db.query('UPDATE reservation SET etat = ? WHERE id = ?', [status, id], (err, result) => {
          if (err) {
            return db.rollback(() => {
              console.error('Erreur lors de l\'acceptation de la réservation :', err);
              callback(err, null);
            });
          }
    
          // 2. Récupérer les informations nécessaires à partir de la réservation mise à jour
          db.query('SELECT * FROM reservation WHERE id = ?', [id], (err, reservationResult) => {
            if (err) {
              return db.rollback(() => {
                console.error('Erreur lors de la récupération de la réservation :', err);
                callback(err, null);
              });
            }
    
            const reservation = reservationResult[0];
    
            // 3. Récupérer l'idEmploye depuis la table sign
            db.query('SELECT id FROM sign WHERE email = ?', [reservation.email], (err, signResult) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Erreur lors de la récupération de l\'idEmploye :', err);
                  callback(err, null);
                });
              }
    
              const idEmploye = signResult[0].id;
              console.log(idEmploye)
              // 4. Récupérer l'idEquipement depuis la table equipement
              db.query('SELECT idEquipement FROM equipement WHERE NumSerie = ?', [reservation.NumSerie], (err, equipementResult) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Erreur lors de la récupération de l\'idEquipement :', err);
                    callback(err, null);
                  });
                }
    
                const idEquipement = equipementResult[0].idEquipement;
                console.log(idEquipement)
                // 5. Insérer les informations récupérées dans la table equipement_employe
                db.query('INSERT INTO equipement_employe (nomEmploye, idEmploye, idEquipement, equipementName, numSerie, emailEmploye, categorie) VALUES (?, ?, ?, ?, ?, ?, ?)',
                  [reservation.nameUser, idEmploye, idEquipement, reservation.nameEquipement, reservation.NumSerie, reservation.email, reservation.categorie],
                  (err, result) => {
                    if (err) {
                      return db.rollback(() => {
                        console.error('Erreur lors de l\'insertion dans equipement_employe :', err);
                        callback(err, null);
                      });
                    }
    
                    db.commit((err) => {
                      if (err) {
                        return db.rollback(() => {
                          console.error('Erreur lors de la validation de la transaction :', err);
                          callback(err, null);
                        });
                      }
    
                      callback(null, result);
                    });
                  });
              });
            });
          });
        });
      });
    },
    
    refuseReservation: (id, status,callback) => {
      db.query('UPDATE reservation SET etat = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) {
          console.error('Erreur lors de la refus de la réservation :', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });       
    },
    getReservationById: (id, callback)=>{
      db.query("SELECT * FROM reservation WHERE id= ?", [id],(err, result)=>{
        if (err) {
          console.error('Erreur lors de la recuperetion de id :', err);
          callback(err, null);
        } 
        if (result.length===0) {
          callback(null, null);
        }
        callback(null, result[0])
      })
    },
    updateReservation: (id, values) => {
      return new Promise((resolve, reject) => {
        const sql = "UPDATE reservation SET nameUser = ?, nameEquipement = ?, NumSerie = ?, email = ?, categorie = ? WHERE id = ?";
        const updatedValues = [
          values.nameUser,
          values.nameEquipement,
          values.NumSerie,
          values.email,
          values.categorie,
          id
        ];
        db.query(sql, updatedValues, (err, data) => {
          console.log(updatedValues)
          if (err) {
            console.error(err.message);
            reject("Error updating reservation");
          } else {
            resolve("Reservation updated successfully");
          }
        });
      });
    },
    deleteReservation: (id) => {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM reservation WHERE id = ?";
        db.query(query, [id], (error, results) => {
          if (error) {
            console.error(error);
            reject("Error deleting reservation");
          } else {
            resolve("reservation deleted successfully");
          }
        });
      });
    }

};
  
module.exports= ReservationModel;