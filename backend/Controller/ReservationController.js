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
    },

    getAllReservation: (req, res) => {
      ReservationModel.getAllReservation()
        .then(reservation => {
          res.status(200).json(reservation);
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
       });
    },

    getReservationDetails: (req, res) => {
      const reservationId = req.params.reservationId;
      console.log(reservationId)
      ReservationModel.getReservationDetails(reservationId)
        .then(reservation => {
          console.log(reservation)
          res.json(reservation);
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
      });
  },
};
  
io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('nouvelle_reservation_admin', (dataReservation) => {
      console.log('Nouvelle réservation reçue :', dataReservation);
      const reservationId = reservation.reservationId; 
      
      console.log('reservationId', reservationId)
      const reservationDataForAdmin = { ...dataReservation, reservationId, type:'reservation' };
      io.emit('nouvelle_reservation_admin', reservationDataForAdmin)
      console.log(reservationDataForAdmin)
    });  
});
  
  
  


module.exports= ReservationController;