const express = require('express')
const route = express.Router();
const db = require('../../db')
const {io} = require('../../server') ;  
const ReservationModel= require('../../model/ReservationModel')
const ReservationController= require('../../Controller/ReservationController')

route.post('/reservation', ReservationController.addReservation);


module.exports = route;

/*


route.post('/reservation', (req, res) => {
  const values = [
    req.body.nameUser,
    req.body.nameEquipement,
    req.body.NumSerie,
    req.body.email,
    req.body.categorie,
  ];

  ReservationModel.addReservation(values)
    .then(message => {
      res.status(200).json({ message });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('nouvelle_reservation_admin', (reservation) => {
    console.log('Nouvelle réservation reçue :', reservation);
    const reservationId = reservation.reservationId; 
    
    console.log('reservationId', reservationId)
    const reservationDataForAdmin = { ...reservation, reservationId, type:'reservation' };
    io.emit('nouvelle_reservation_admin', reservationDataForAdmin)
    console.log(reservationDataForAdmin)
  });  
});






route.post('/reservation', (req, res)=>{
    const values=[
        req.body.nameUser,
        req.body.nameEquipement,
        req.body.NumSerie,
        req.body.email,
        req.body.categorie,
    ]
    const insertReservationQuery = "INSERT INTO reservation (nameUser, nameEquipement, NumSerie, email, categorie) VALUES (?, ?, ?, ?, ?)";
    const selectAdminIdQuery = "SELECT id FROM sign WHERE role = 'admin' ";
    
    db.query(insertReservationQuery, values, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erreur lors de l'ajout de la reservation." });
        }
       // console.log("Données de reservation insérées avec succès : ",data)
        const reservationId = data.insertId; // Récupération de l'ID de la réclamation insérée
       // console.log("Données de réclamation insérées avec succès. ID de réclamation :", reservationId);
        db.query(selectAdminIdQuery, (err, rows) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Erreur lors de la sélection de l'ID de l'administrateur." });
            }
            if (rows.length > 0) {
                const adminId = rows[0].id;
                //console.log(adminId)
                if (adminId) { 
                  const reservationDataForAdmin = {reservationId, ...req.body, type: 'reservation'}     
                  //console.log("id: ", reservationId)              
                  io.to(adminId).emit('nouvelle_reservation_admin', reservationDataForAdmin);
                  console.log("les données envoyée:",reservationDataForAdmin)
                  return res.status(200).json({ message: "Réservation ajoutée avec succès." });
                } else {
                  console.error("ID de l'administrateur non trouvé.");
                  return res.status(404).json({ error: "ID de l'administrateur non trouvé." });
                }
            } else {
                console.error("Aucun administrateur trouvé.");
                return res.status(404).json({ error: "Aucun administrateur trouvé." });
            }
        });
    });
});
*/