import { useState, useEffect } from "react";
import Reportes from "../componentes/Reportes";

const GeoComponent = () => {
  const [mostrar, setMostrar] = useState(false)
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET a /geo
    fetch("http://localhost:8000/geo",{method:"GET"})
    .then((response) => response.json())  
    .then((data) => {
      let p = Array.from(data.provincia);
      let m = Array.from(data.municipio);
      setProvincias(p);
      setMunicipios(m);
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

    const handleMostrar = ()=>{
      setMostrar(!mostrar)
    }

  // Renderizar los datos en tu componente
  return (
    <div>
      <Reportes
        mostrar = {mostrar}
        handleMostrar = {handleMostrar}
      />
      <h2>Provincias:</h2>
      <ul>
        {
          provincias.map((provincia) => (
            <li key={provincia.gid}>{provincia.provincia}</li>
          ))
        }
      </ul>

      <h2>Municipios:</h2>
      <ul>
        {municipios.map((municipio) => (
          <li key={municipio.gid}>{municipio.municipio}</li>
        ))}
      </ul>
      <button onClick={handleMostrar}>Abrir</button>
    </div>
  );
};

export default GeoComponent;
