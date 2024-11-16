import { useState } from "react";
import "../style/buscador.css";
import { useMap } from "react-leaflet";
import axios from 'axios'

export default function Buscador({buscador, setBuscador, setLocation, location}) {
  

  const handleSearch = async (e) => { 
    e.preventDefault(); 
    try { 
      const response = await axios.get('http://localhost:8080/geoserver/LuisDaniel/wfs', { 
        params: { 
          service: 'WFS', 
          version: '1.1.0', 
          request: 'GetFeature', 
          typeName: 'LuisDaniel:municipios', // Cambia esto al nombre de tu capa 
          outputFormat: 'application/json', 
          cql_filter: `municipio='${buscador}'`,
        },
      });
      const features = await response.data.features;
      if (features.length > 0) { 
      const { coordinates } = features[0].geometry; 
      // console.log(coordinates[0][0][0]);
      setLocation({ lat: coordinates[0][0][0][1], // Asegúrate de que las coordenadas están en el orden correcto 
        lng: coordinates[0][0][0][0], });
       } else { 
        alert('No se encontraron resultados.');
       } 
    } catch (error) { 
      console.error('Error fetching location data:', error);
    }
  }

  return (
    <div className="InputContainer">
      <input
        placeholder="Nombre del municipio"
        id="input"
        className="input"
        name="text"
        type="text"
        value={buscador}
        onChange={(e) => setBuscador(e.target.value.toUpperCase())}
      />

      <label className="labelforsearch" htmlFor="input">
        <svg className="searchIcon" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
        </svg>
      </label>
      <button className="enviar" onClick={handleSearch}>Buscar</button>
    </div>
  );
}
