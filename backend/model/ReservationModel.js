const db= require('../db')
const {io} = require('../server')

const ReservationModel = {
    addReservation: (values) => {
      //console.log(values)
      return new Promise((resolve, reject) => {
        const insertReservationQuery = "INSERT INTO reservation (nameUser, nameEquipement, NumSerie, email, categorie) VALUES (?, ?, ?, ?, ?)";
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
        const selectReservatioQuery = "SELECT * FROM reservation";
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
};
  
module.exports= ReservationModel;