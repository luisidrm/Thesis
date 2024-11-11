import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import '../style/addSchool.css'

export default function FormAddSchool(props){
  // const [latitud, setLatitud] = useState(21.734)
  // const [longitud, setLongitud] = useState(-79.783)
  // const [nombre, setNombre] = useState('')


  return(
    <form onSubmit={props.handleSubmit} className="form-inputs">
    <div className="input-wrapper">
      <div className="latlng">
        <input type="number" name="latitud" placeholder="Latitud" value={props.latitud} onChange={(e)=>props.setLatitud(e.target.value)}/>
        <input type="number" name="longitud" placeholder="Longitud" value={props.longitud} onChange={(e)=>props.setLongitud(e.target.value)}/>
      </div>
      <input type="text" id="nombre" name="nombreEscuela" placeholder="Nombre de la Escuela" value={props.nombre} onChange={(e)=>props.setNombre(e.target.value)}/>
    </div>
    <div className="btn-form">
      <button type="submit" className="btn-agregar">Enviar</button>
      <button type="button" className="btn-cancelar">Cancelar</button>
    </div>

  </form>
  )
}