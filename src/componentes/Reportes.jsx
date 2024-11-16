import { useEffect, useState } from "react";
// import axios from "axios";
import "../style/reportes.css";
// import { useMapEvents } from "react-leaflet";
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
  const [resultados, setResultados] = useState(resultado);

  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await fetch('http://pagina_de_rui:8000/api/controlador',{
          method: 'POST',
          body: JSON.parse({
            escuela: props.escuela,
            municipio: props.municipioSeleccionado,
            provincia: props.provinciaSeleccioanda
          })
        })
        const result = await response.json()
      }catch(error){
        console.error('Error', error)
      }
    }
    fetchData
    setResultados(resultado);
  }, []);

  const cierre =()=>{
    props.handleMostrar()
    props.setEscuela("");
    props.setMunicipioSeleccionado("");
    props.setProvinciaSeleccionada("");
  }

  return (
    <div className={props.mostrar ? "reportes" : "oculto"}>
      <div className="scroll">
        <button className="button-scroll" onClick={cierre}>
          <ExpandMoreIcon />
        </button>
        <h1>Resultados de Bebras</h1>
      </div>
      <div className="data-completa">
        <div className="data">
          <h2>Localización:</h2>
          <h2>{props.escuela}</h2>
          <h2>{props.municipioSeleccionado}</h2>
          <h2>{props.provinciaSeleccionada}</h2>

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