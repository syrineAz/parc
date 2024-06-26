const db = require('../db')
const DashboardModel={
    getEmployeeCount: async () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT COUNT(*) AS total FROM user', (err, result) => {
            if (err) {
              console.error('Erreur lors du comptage des employés ', err);
              reject(err);
              return;
            }
            const employeCount = result[0].total;
            resolve(employeCount);
          });
        });
    },
    getSupplierCount: async () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT COUNT(*) AS total FROM fournisseur', (err, result) => {
            if (err) {
              console.error('Erreur lors du comptage des fournisseurs ', err);
              reject(err);
              return;
            }
            const fournisseurCount = result[0].total;
            resolve(fournisseurCount);
          });
        });
    },
    getReclamationCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total FROM reclamationuser', (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des reclamations ', err);
                reject(err);
                return;
              }
              const fournisseurCount = result[0].total;
              resolve(fournisseurCount);
            });
          });
    },
    getReservationCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total FROM reservation', (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des reservations ', err);
                reject(err);
                return;
              }
              const ReservationCount = result[0].total;
              resolve(ReservationCount);
            });
          });
    },
    getOrdinateurCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Les Ordinateurs' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des ordinateurs ', err);
                reject(err);
                return;
              }
              const OrdinateursCount = result[0].total;
              resolve(OrdinateursCount);
            });
          });
    },
    getReseauxCommunicationCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Réseaux et communication' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Réseaux et communication', err);
                reject(err);
                return;
              }
              const ReseauxCount = result[0].total;
              resolve(ReseauxCount);
           //   console.log("ReseauxCount",ReseauxCount)
            });
        });
    },
    getPeripheriqueCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Périphériques de stockage' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Périphériques de stockage', err);
                reject(err);
                return;
              }
              const peripheriqueCount = result[0].total;
              resolve(peripheriqueCount);
            //  console.log("PeripheriqueCount",peripheriqueCount)
            });
        });
    },
    getImprimanteCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Imprimantes et scanners' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Imprimantes et scanners', err);
                reject(err);
                return;
              }
              const imprimanteCount = result[0].total;
              resolve(imprimanteCount);
           //   console.log("ImprimanteCount",imprimanteCount)
            });
        });
    },
    getEcransCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Écrans et moniteurs' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Écrans et moniteurs ', err);
                reject(err);
                return;
              }
              const EcransCount = result[0].total;
              resolve(EcransCount);
           //   console.log("EcransCount",EcransCount)
            });
        });
    },
    getAccesoireCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Accessoires informatiques' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Accessoires informatiques   ', err);
                reject(err);
                return;
              }
              const AccessoiresCount = result[0].total;
              resolve(AccessoiresCount);
           //   console.log("AccesoireCount",AccessoiresCount)
            });
        });
    },
    getConnectiqueCount: async()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total FROM equipement WHERE categorie ='Accessoires de câblage et connectique' ", (err, result) => {
              if (err) {
                console.error('Erreur lors du comptage des Accessoires de câblage et connectique   ', err);
                reject(err);
                return;
              }
              const AccesoiresCablageCount = result[0].total;
              resolve(AccesoiresCablageCount);
           //   console.log("ConnectiqueCount",AccesoiresCablageCount)
            });
        });
    },
    getReparation: async()=>{
      return new Promise((resolve, reject) => {
          db.query("SELECT COUNT(*) AS total FROM reparations ", (err, result) => {
            if (err) {
              console.error('Erreur lors du comptage des reparations   ', err);
              reject(err);
              return;
            }
            const reparationCount = result[0].total;
            resolve(reparationCount);
         //   console.log("ConnectiqueCount",AccesoiresCablageCount)
          });
      });
    },
    getAffectation: async()=>{
      return new Promise((resolve, reject) => {
          db.query("SELECT COUNT(*) AS total FROM equipement_employe ", (err, result) => {
            if (err) {
              console.error('Erreur lors du comptage des reparations   ', err);
              reject(err);
              return;
            }
            const reparationCount = result[0].total;
            resolve(reparationCount);
         //   console.log("ConnectiqueCount",AccesoiresCablageCount)
          });
      });
    },
    getAccount : async ()=>{
      return new Promise((resolve, reject) => {
        const sql = "SELECT id, name,email, role FROM sign  ";
        db.query(sql, (err, result) => {
          if (err) {
            console.error(err);
            reject("Error getting utilisateur");
          } else {
            resolve(result);
          }
        });
      });
    },
  
    updateRole: async (id, role) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE sign SET role = ? WHERE id = ?';
        const values = [role, id]; // Values array for placeholders in query
    
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(err);
            reject("Error updating role"); // Reject with an appropriate error message
          } else {
            resolve(result);
          }
        });
      });
    },
    getAllEquipementsByCategory :async () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT categorie, COUNT(*) AS count FROM equipement GROUP BY categorie"; // Requête SQL pour récupérer les équipements groupés par catégorie
        db.query(sql, (err, results) => {
          if (err) {
            console.error('Erreur lors de la récupération des équipements par catégorie :', err);
            reject('Erreur lors de la récupération des équipements par catégorie');
          } else {
            resolve(results); // Renvoie les résultats de la requête SQL (tableau d'objets { category, count })
          }
        });
      });
    },
    getAllReparations: async () => {
      return new Promise((resolve, reject) => {
          const query = `
              SELECT * FROM reparations
              WHERE status IN ('En cours', 'En attente', 'Terminer')
              ORDER BY start_date ASC;`;

          db.query(query, (err, results) => {
              if (err) {
                  console.error('Error fetching reparations:', err);
                  reject('Error fetching reparations');
              }
              resolve(results);
          });
      });
  },
}
module.exports= DashboardModel;


