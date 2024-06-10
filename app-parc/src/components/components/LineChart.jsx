import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";
import { format, parseISO } from "date-fns";

const LineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getAllReparations");
        const rawData = response.data;

        // Separate data by status
        const dataByStatus = {
          "En cours": [],
          "En attente": [],
          "Terminer": []
        };

        rawData.forEach(item => {
          const dataPoint = {
            x: parseISO(item.start_date), // Convert start_date to Date object
            y: item.idEquipement // Use idEquipement as y value
          };
          const endPoint = {
            x: parseISO(item.end_date), // Convert end_date to Date object
            y: item.idEquipement // Use idEquipement as y value
          };

          if (item.status === 'En cours') {
            dataByStatus['En cours'].push(dataPoint);
            dataByStatus['En cours'].push(endPoint);
          } else if (item.status === 'En attente') {
            dataByStatus['En attente'].push(dataPoint);
            dataByStatus['En attente'].push(endPoint);
          } else if (item.status === 'Terminer') {
            dataByStatus['Terminer'].push(dataPoint);
            dataByStatus['Terminer'].push(endPoint);
          }
        });

        // Format data for Nivo line chart
        const formattedData = [
          {
            id: "En cours",
            data: dataByStatus['En cours']
          },
          {
            id: "En attente",
            data: dataByStatus['En attente']
          },
          {
            id: "Terminer",
            data: dataByStatus['Terminer']
          }
        ];

        setLineData(formattedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 90, bottom: 50, left: 60 }}
      xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date de réparation",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: "every 1 days", // Ensure a tick for every day
        tickFormat: (d) => format(d, "MMM dd yyyy") // Format the date as MMM dd yyyy
      }}
      axisLeft={{
        orient: "left",
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nombre d'équipements",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointBorderWidth={2}
      pointBorderColor={{ from: "color", modifiers: [] }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 90,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
