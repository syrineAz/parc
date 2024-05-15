const express= require ('express');
const cors=require('cors');
const bodyParser= require('body-parser')
const path = require('path');
const app= express();
const db= require('./db.js')
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["post","get","put","DELETE"]
}));
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});
const session= require ('express-session')
app.use(session({
    secret :'secret',
    resave :false,
    saveUninitialized:false,
    cookie :{
        secure : false,
        maxAge : 1000* 60 * 60 *40
    }
}))
const cookieParser= require('cookie-parser')
app.use(cookieParser())
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const http= require('http')
const socketIo= require('socket.io');
const server= http.createServer(app)
const io = socketIo(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
      }
}); //attacher socket.IO a votre server HTTP 
io.on('connection', (socket)=>{
  console.log('nouvelle connexion socket: '+ socket.id)

})
server.listen(SOCKET_PORT,()=>{
  console.log(`Socket.IO Express écoutant sur le port ${SOCKET_PORT}`);

})

module.exports={io, server,db}


const authRoutes = require('./Routes/auth/authRoutes.js');
app.use(authRoutes);

const usersRoutes = require('./Routes/users/usersRoutes.js');
app.use(usersRoutes);

const equipementRoutes = require('./Routes/equipement/equipementRoutes.js');
app.use(equipementRoutes);

const RoutesFourniseeur = require ('./Routes/fournisseur/RoutesFournisseur.js')
app.use(RoutesFourniseeur)

const ReclamationRoutes = require ('./Routes/reclamationUser/ReclamationRoutes.js')
app.use(ReclamationRoutes)

const RoutesEquipementEmploye = require ('./Routes/EquipementEmploye/RoutesEquipementEmploye.js')
app.use(RoutesEquipementEmploye)

const DashboardRoutes = require ('./Routes/dashboard/DashboardRoutes.js')
app.use(DashboardRoutes)

const ReservatinRoutes = require('./Routes/reservation/ReservationRoutes.js')
app.use(ReservatinRoutes)

app.get('/favicon.ico', (req, res) => res.status(204));