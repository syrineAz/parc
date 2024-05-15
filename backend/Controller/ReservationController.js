const db= require('../db')
const {io} = require('../server')
const ReservationModel= require('../model/ReservationModel')

const ReservationController = {
    addReservation: (req, res) => {
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
    }
};
  
  
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
  
  
  


module.exports= ReservationController;