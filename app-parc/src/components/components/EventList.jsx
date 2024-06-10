import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(savedEvents);
  }, []);

  return (
    <Box
      backgroundColor=""
      p="15px"
      borderRadius="4px"
      flex="1 1 100%"
    >
      <Typography variant="h5" display="flex" alignItems="center">
        <EventIcon sx={{ mr: 1 }} /> Calendar Events
      </Typography>
      <List>
        {events.map((event) => (
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
  );
};

export default EventList;
