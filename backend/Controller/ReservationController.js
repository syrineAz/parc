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

    getAcceptReservation: (req, res) => {
      const { id } = req.body;
      ReservationModel.getReservationById(id, (err, reservation) => {
        if (err) {
          console.error('Erreur lors de la récupération de la réservation :', err);
          return res.status(500).json({ error: 'Erreur serveur lors de la récupération de la réservation.' });
        }
        if (!reservation) {
          return res.status(404).json({ error: 'Réservation non trouvée.' });
        }
        if (reservation.etat !== 'En attente') {
          return res.status(400).json({ error: 'La réservation a déjà été traitée.' });
        }
        ReservationModel.acceptReservation(id, 'acceptée', (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'acceptation de la réservation :', err);
            return res.status(500).json({ error: 'Erreur serveur lors de l\'acceptation de la réservation.' });
          }
          if (result && result.affectedRows > 0) {
            res.json({ message: 'Réservation acceptée avec succès.' });
          } else {
            res.status(404).json({ error: 'Réservation non trouvée.' });
          }
        });
      });
    },
    
    getRefusReservation: (req, res) => {
      const { id } = req.body;
      ReservationModel.getReservationById(id, (err, reservation) => {
        if (err) {
          console.error('Erreur lors de la récupération de la réservation :', err);
          return res.status(500).json({ error: 'Erreur serveur lors de la récupération de la réservation.' });
        }
    
        if (!reservation) {
          return res.status(404).json({ error: 'Réservation non trouvée.' });
        }
    
        if (reservation.etat !== 'En attente') {
          return res.status(400).json({ error: 'La réservation a déjà été traitée.' });
        }
    
        ReservationModel.refuseReservation(id, 'refusée', (err, result) => {
          if (err) {
            console.error('Erreur lors du refus de la réservation :', err);
            return res.status(500).json({ error: 'Erreur serveur lors du refus de la réservation.' });
          }
    
          if (result && result.affectedRows > 0) {
            res.json({ message: 'Réservation refusée avec succès.' });
          } else {
            res.status(404).json({ error: 'Réservation non trouvée.' });
          }
        });
      });
    },
    updateReservation: async(req,res)=>{
      const id = req.params.id;
      try {
          const result = await ReservationModel.updateReservation(id, req.body); 
          return res.status(200).send(result);
      } catch (error) {
          console.error(error);
          return res.status(500).send(error);
      }
    },
    deleteReservation: async(req,res)=>{
      const id = req.params.id;
      try {
        const result = await ReservationModel.deleteReservation(id); 
        return res.status(200).send(result);
      } catch (error) {
        console.error(error);
        return res.status(500).send(error);
      }
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