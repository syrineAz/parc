const DashboardModel = require('../model/DashboardModel')
const DashboardController={
    getEmployeeCount: async (req, res) => {
        try {
          const employeCount = await DashboardModel.getEmployeeCount();
          res.json({ employeCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des employés ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des employés.' });
        }
    },  
    getSupplierCount: async (req, res) => {
        try {
          const fournisseurCount = await DashboardModel.getSupplierCount();
          res.json({ fournisseurCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des fournisseurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des fournisseurs.' });
        }
    },
    getReclamationCount: async (req, res) => {
        try {
          const ReclamationCount = await DashboardModel.getReclamationCount();
          res.json({ ReclamationCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des reclamation ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des reclamation.' });
        }
    },  
    getReservationCount: async (req, res) => {
        try {
          const ReservationCount = await DashboardModel.getReservationCount();
          res.json({ ReservationCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des reservation ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des reservation.' });
        }
    }, 
    getOrdinateurCount: async (req, res) => {
        try {
          const OrdinateursCount = await DashboardModel.getOrdinateurCount();
          res.json({ OrdinateursCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getReseauxCommunicationCount: async (req, res) => {
        try {
          const ReseauxCount = await DashboardModel.getReseauxCommunicationCount();
          res.json({ ReseauxCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getPeripheriqueCount: async (req, res) => {
        try {
          const peripheriqueCount = await DashboardModel.getPeripheriqueCount();
          res.json({ peripheriqueCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getImprimanteCount: async (req, res) => {
        try {
          const imprimanteCount = await DashboardModel.getImprimanteCount();
          res.json({ imprimanteCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getEcransCount: async (req, res) => {
        try {
          const EcransCount = await DashboardModel.getEcransCount();
          res.json({ EcransCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getAccesoireCount: async (req, res) => {
        try {
          const AccessoiresCount = await DashboardModel.getAccesoireCount();
          res.json({ AccessoiresCount });
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getConnectiqueCount: async (req, res) => {
        try {
          const AccesoiresCablageCount = await DashboardModel.getConnectiqueCount();
          res.json({ AccesoiresCablageCount });
         // console.log(AccesoiresCablageCount)
        } catch (err) {
          console.error('Erreur lors de la récupération du comptage des oridnateurs ', err);
          res.status(500).json({ error: 'Erreur lors du comptage des oridnateurs.' });
        }
    },  
    getAccount: async (req, res) => {
      try {
        const accounts = await DashboardModel.getAccount();
        res.json({ accounts });
       // console.log(AccesoiresCablageCount)
      } catch (err) {
        console.error('Erreur lors de la récupération des comptes ', err);
        res.status(500).json({ error: 'Erreur lors du comptage des comptes.' });
      }
    }, 
    getReparation: async (req, res) => {
      try {
        const reparationCount = await DashboardModel.getReparation();
        res.json({ reparationCount });
       // console.log(AccesoiresCablageCount)
      } catch (err) {
        console.error('Erreur lors de la récupération des réparations ', err);
        res.status(500).json({ error: 'Erreur lors du comptage des reparations.' });
      }
    },  
}
module.exports= DashboardController;