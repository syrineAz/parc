import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Header from "../../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Calendrier = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Charger les événements depuis localStorage ou toute autre source de données au montage du composant
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setCurrentEvents(savedEvents);

    // Charger les informations utilisateur depuis localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, []);

  useEffect(() => {
    // Vérifier s'il y a des événements aujourd'hui
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const todaysEvents = currentEvents.filter(event => event.start.split('T')[0] === today && event.emailUser === user?.email);

    if (todaysEvents.length > 0) {
      toast.info(`Vous avez ${todaysEvents.length} événement(s) prévu(s) aujourd'hui.`);
    }
  }, [currentEvents, user]);

  const handleDateClick = (selected) => {
    const title = prompt("Entrer un nouveau évenement");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title && user) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        emailUser: user.email, // Ajouter l'email de l'utilisateur à l'événement
      };

      // Ajouter le nouvel événement à la liste des événements actuels
      const updatedEvents = [...currentEvents, newEvent];
      setCurrentEvents(updatedEvents); // Mettre à jour l'état local

      // Mettre à jour localStorage avec les événements mis à jour
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove(); // Supprime l'événement du calendrier

      // Filtrer les événements pour exclure celui qui vient d'être supprimé
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== clickInfo.event.id
      );

      setCurrentEvents(updatedEvents); // Mettre à jour l'état local avec les événements mis à jour

      // Mettre à jour localStorage avec les événements mis à jour
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

      toast.success('Événement supprimé avec succès'); // Affiche une notification de succès
    }
  };

  // Filtrer les événements pour afficher uniquement ceux de l'utilisateur connecté
  const userEvents = currentEvents.filter(event => event.emailUser === user?.email);

  return (
    <Box m="20px">
      <Header title="Calendrier" subtitle="Page interactive du calendrier complet" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor="#f0f0f0"
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Evenements</Typography>
          <List>
            {userEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "#94e2cd",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={new Date(event.start).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={userEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendrier;
