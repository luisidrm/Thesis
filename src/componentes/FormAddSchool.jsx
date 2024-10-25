import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import '../style/addSchool.css'

export default function FormAddSchool(props){
  const [latitud, setLatitud] = useState(21.734)
  const [longitud, setLongitud] = useState(-79.783)
  const [nombre, setNombre] = useState('')

  useMapEvents({
    click: async(e)=>{
      const {lat, lng} = e.latlng;
      setLatitud(lat)
      setLongitud(lng)
    }
  })
  const sendData = async() =>{
    try{
      const response = await fetch('http://localhost:8000/escuela',{
        method: 'PUT',
        body: JSON.parse({
          latitud: latitud,
          longitud: longitud,
          nombre: nombre
        })
      })
      alert('Escuela agregada correctamente', response.status)
    }catch(error){
      alert('Ocurrio un error al intentar agregar la escuela', error)
    }
  }


  return(
    <form onSubmit={sendData} className="form-inputs">
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

  </form>
  )
}