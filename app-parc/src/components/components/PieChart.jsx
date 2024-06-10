import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getAllEquipement");
        const equipmentData = response.data.equipement;

        // Log pour vérifier la structure des données
        console.log("API Response:", equipmentData);

        // Vérifiez si equipmentData est bien un tableau
        if (Array.isArray(equipmentData)) {
          // Convertir les données pour le PieChart de Nivo
          const pieData = equipmentData.map(item => ({
            id: item.categorie,
            label: item.categorie,
            value: item.count,
          }));

          setData(pieData);
        } else {
          console.error("Expected an array but got:", typeof equipmentData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsivePie
      data={data}
      theme={{
        // Définir votre thème Nivo ici
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
      }}
      margin={{ top: 30, right: 100, bottom: 120, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 0,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      //legends={[
        //{
          //anchor: "bottom",
       //   direction: "column",
         // justify: false,
       //   translateX: 10,
         // translateY: 10,
          //itemsSpacing: 10,
    //      itemWidth: 1000,
      //    itemHeight: 20,
        //  itemTextColor: "#999",
    //      itemDirection: "left-to-right",
      //    itemOpacity: 1,
  //        symbolSize: 18,
    //      symbolShape: "circle",
      //    effects: [
        //    {
          //    on: "hover",
            //  style: {
      //          itemTextColor: "#000",
        //      },
        //    },
        //  ],
    //    },
    //  ]}
    />
  );
};

export default PieChart;
