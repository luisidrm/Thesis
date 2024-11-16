import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import axios from 'axios'
import '../style/addSchool.css'
import { useState } from "react";
import FormAddSchool from "../componentes/FormAddSchool";
import EventComponent from "../componentes/EventComponent";

export default function AddSchool(){
  const [latitud, setLatitud] = useState(21.734)
  const [longitud, setLongitud] = useState(-79.783)
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')

  const cubaBounds = [
    [18.0, -87.0], // Suroeste de Cuba
    [25.0, -74.0]  // Noreste de Cuba
  ];

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const xml = 
    ` <wfs:Transaction service="WFS" version="1.0.0" 
        xmlns:wfs="http://www.opengis.net/wfs" 
        xmlns:gml="http://www.opengis.net/gml" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.opengis.net/wfs 
                            http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd"> 
        <wfs:Insert> 
          <feature:escuelas_cuba xmlns:feature="LuisDaniel"> 
            <feature:geometry> 
              <gml:Point srsName="EPSG:4326"> 
                <gml:coordinates>${longitud},${latitud}</gml:coordinates> 
              </gml:Point> 
            </feature:geometry> 
            <feature:name>${nombre}</feature:name> 
          </feature:escuelas_cuba> 
        </wfs:Insert> 
      </wfs:Transaction> `;
          try { 
            const response = await axios.post('http://localhost:8080/geoserver/LuisDaniel/wfs', xml,{ 
              params:{
                service: 'WFS', 
                version: '1.0.0', 
                request: 'Transaction', 
                transactionType: 'Insert', 
                featureType: 'escuelas_cuba', // Asegúrate de cambiar esto al nombre de tu feature type  
              },
              headers: {
               'Content-Type': 'application/xml',
                'Accept': 'application/xml' 
              }
            });
              if (response.ok) { 
                console.log('Transacción exitosa');
              } else { 
                console.error('Error en la transacción:', response.statusText); 
              } 
          } catch (error) { console.error('Error de conexión:', error);}
        };

// useMapEvents({
  //   click: async(e)=>{
    //     const {lat, lng} = e.latlng;
    //     setLatitud(lat)
    //     setLongitud(lng)
    //   }
    // })
  // const sendData = async() =>{
  //   try{
  //     const response = await fetch('http://localhost:8000/escuela',{
  //       method: 'PUT',
  //       body: JSON.parse({
  //         latitud: latitud,
  //         longitud: longitud,
  //         nombre: nombre
  //       })
  //     })
  //     alert('Escuela agregada correctamente', response.status)
  //   }catch(error){
  //     alert('Ocurrio un erro al intentar agregar la escuela', error)
  //   }
  // }

  return(
    <div className="formulario">
      <div className="encabezado">
        <a href='/' className="button">
          <div className="button-box">
            <span className="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
              </svg>
            </span>
              <span className="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
              </svg>
            </span>
          </div>
        </a>
        <h2 className='ml-8 align-middle text-center font-bold text-blue-600 text-4xl'>Introduzca los datos de la escuela</h2>
      </div>
      <div className="map-container">
        <MapContainer
          zoom={7}
          center={[21.734,-80.5]}
          style={{ height: "60vh", width: "100%" }}
          maxBounds={cubaBounds}
          maxBoundsViscosity={1.0}
          minZoom={6}
          zoomControl={false}
          attributionControl = {false}
        >
          <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={2} 
          />
          <EventComponent
            setLatitud = {setLatitud}
            setLongitud = {setLongitud}
          />
          </MapContainer>
        <FormAddSchool
          nombre = {nombre}
          latitud = {latitud}
          longitud = {longitud}
          categoria={categoria}
          setCategoria={setCategoria}
          setLatitud = {setLatitud}
          setLongitud = {setLongitud}
          setNombre = {setNombre}
          handleSubmit = {handleSubmit}
        />
      </div>
        {/* <form onSubmit={sendData} className="form-inputs">
          <div className="input-wrapper">
            <div className="latlng">
              <input type="number" name="latitud" placeholder="Latitud" value={latitud} onChange={(e)=>setLatitud(e.target.value)}/>
              <input type="number" name="longitud" placeholder="Longitud" value={longitud} onChange={(e)=>setLongitud(e.target.value)}/>
            </div>
            <input type="text" id="nombre" name="nombreEscuela" placeholder="Nombre de la Escuela" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
          </div>
          <div className="btn-form">
            <button type="submit" className="btn-agregar">Enviar</button>
            <button type="button" className="btn-cancelar">Cancelar</button>
          </div>

        </form> */}

    </div>
  )
}