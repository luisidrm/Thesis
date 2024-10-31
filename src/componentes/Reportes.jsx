import { useEffect, useState } from "react";
import axios from "axios";
import "../style/reportes.css";
import { useMapEvents } from "react-leaflet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import resultado from "../../resultados.json";

export default function Reportes(props) {
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [codigoSeleccionado, setCodigoSeleccionado] = useState("");
  const [provinciaSeleccioanda, setProvSeleccionada] = useState("");
  const [resultados, setResultados] = useState(resultado);

  useEffect(() => {
    setResultados(resultado);
  }, []);

  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const zoom = map.getZoom()
      const response = await axios.get(
        "http://localhost:8080/geoserver/LuisDaniel/wfs",
        {
          params: {
            service: "WFS",
            version: "1.0.0",
            request: "GetFeature",
            typeName: "LuisDaniel:municipios",
            outputFormat: "application/json",
            srsname: "EPSG:4326",
            bbox: `${lng},${lat},${lng},${lat},EPSG:4326`,
          },
        }
            // "http://localhost:8080/geoserver/LuisDaniel/wms",
            // {
            //   params:{
            //     SERVICE: 'WMS',
            //     VERSION: '1.1.1',
            //     REQUEST: 'GetFeatureInfo',
            //     FORMAT: 'image/jpeg',
            //     TRANSPARENT: true,
            //     QUERY_LAYERS: 'LuisDaniel:municipios',
            //     STYLES: '',
            //     LAYERS: 'LuisDaniel:municipios',
            //     EXCEPTIONS: 'application/vnd.ogc.se_inimage',
            //     INFO_FORMAT: 'application/json',
            //     FEATURE_COUNT: 50,
            //     X: 50,
            //     Y: 50,
            //     SRS: 'EPSG:4326',
            //     WIDTH: 101,
            //     HEIGHT: 101,
            //     BBOX: `${lng},${lat},${lng+0.1371170258},${lat+0.1386489308},EPSG:4326`,
            //   }

            // }
            
      );
      const responseProv = await axios.get(
        "http://localhost:8080/geoserver/LuisDaniel/wfs",
        {
          params: {
            service: "WFS",
            version: "1.0.0",
            request: "GetFeature",
            typeName: "LuisDaniel:provincias",
            outputFormat: "application/json",
            srsname: "EPSG:4326",
            bbox: `${lng},${lat},${lng},${lat},EPSG:4326`,
          },
        }
        // "http://localhost:8080/geoserver/LuisDaniel/wms",
        //     {
        //       params:{
        //         SERVICE: 'WMS',
        //         VERSION: '1.1.1',
        //         REQUEST: 'GetFeatureInfo',
        //         FORMAT: 'image/jpeg',
        //         TRANSPARENT: true,
        //         QUERY_LAYERS: 'LuisDaniel:provincias',
        //         STYLES: '',
        //         LAYERS: 'LuisDaniel:provincias',
        //         EXCEPTIONS: 'application/vnd.ogc.se_inimage',
        //         INFO_FORMAT: 'application/json',
        //         FEATURE_COUNT: 50,
        //         X: 50,
        //         Y: 50,
        //         SRS: 'EPSG:4326',
        //         WIDTH: 101,
        //         HEIGHT: 101,
        //         BBOX: `${lng},${lat},${lng+0.1371170258},${lat+0.1386489308},EPSG:4326`,
        //       }
        //     }
      );
      const features = response.data.features;
      const featuresProv = responseProv.data.features;
      if (features.length > 0) {
        setMunicipioSeleccionado(features[0].properties.municipio);
        setCodigoSeleccionado(features[0].properties.codigo);
        setProvSeleccionada(featuresProv[0].properties.provincia);
        props.handleMostrar();
      }
      // document.getElementsByClassName('reportes').focus()
    },
  });
  return (
    <div className={props.mostrar ? "reportes" : "oculto"}>
      <div className="scroll">
        <button className="button-scroll" onClick={props.handleMostrar}>
          <ExpandMoreIcon />
        </button>
        <h1>Resultados de Bebras</h1>
      </div>
      <div className="data-completa">
        <div className="data">
          <h2>{municipioSeleccionado}</h2>
          <h2>{codigoSeleccionado}</h2>
          <h2>{provinciaSeleccioanda}</h2>
        </div>
        <div className="graficos">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={300}
              height={300}
              data={resultados}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="escuela" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="promedio"
                fill="#8884d8"
                activeBar={<Rectangle fill="blue" stroke="black" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="graficos2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={300}
              height={300}
              data={resultados}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="escuela" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="promedio" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}