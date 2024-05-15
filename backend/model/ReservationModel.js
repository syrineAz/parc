const db= require('../db')
const {io} = require('../server')

const ReservationModel = {
    addReservation: (values) => {
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
                const reservationDataForAdmin = { reservationId, ...values, type: 'reservation' };
                io.to(adminId).emit('nouvelle_reservation_admin', reservationDataForAdmin);
                resolve("Réservation ajoutée avec succès.");
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
    }
};
  
module.exports= ReservationModel;