import { useMapEvents } from "react-leaflet"

export default function EventComponent(props){
  useMapEvents({
    click: async(e)=>{
      const {lat, lng} = e.latlng;
      props.setLatitud(lat)
      props.setLongitud(lng)
    }
  })
  return(
    <div></div>
  )
}