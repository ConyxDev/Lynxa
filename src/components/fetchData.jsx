import { useEffect } from 'react';
import axios from 'axios';

const WMS_URL = "https://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0";

const FetchWMSData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(WMS_URL, {
          params: {
            REQUEST: "GetFeatureInfo",
            LAYERS: "ch.swisstopo-vd.ortschaftenverzeichnis_plz",
            QUERY_LAYERS: "ch.swisstopo-vd.ortschaftenverzeichnis_plz",
            BBOX: "2485000,1070000,2500000,1110000", // Coordonnées pour le canton de Genève
            CRS: "EPSG:2056",
            WIDTH: 1024,
            HEIGHT: 768,
            I: 512, // Point à interroger sur l'axe X
            J: 384, // Point à interroger sur l'axe Y
            INFO_FORMAT: "application/json" // Format de la réponse
          }
        });
        console.log("Données récupérées :", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return <div>Vérifiez la console pour voir les données récupérées.</div>;
};

export default FetchWMSData;