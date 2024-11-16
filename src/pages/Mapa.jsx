import NavBar from "../componentes/NavBar";
import '../style/mapa.css'
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet";
import Buscador from "../componentes/Buscador";
import { createContext,  useState } from "react";
import Reportes from "../componentes/Reportes";
import LocationMarker from "../componentes/LocationMarker";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Specs from "../componentes/Specs";
import EventComponentReportes from "../componentes/EventComponentReportes";

export const ReportesContext = createContext(null)

export default function Mapa() {
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [provinciaSeleccionada, setProvSeleccionada] = useState("");
  const [escuela, setEscuela] = useState("")
  const [location, setLocation] = useState(null)
  const [specs, setSpecs] = useState(false)
  const [select, setSelect] = useState('2024')
  const [selectParticipantes, setSelectParticipantes] = useState('Participantes')
  const [buscador, setBuscador] = useState("");
  const { BaseLayer, Overlay } = LayersControl;

  const handleSpecs = () =>{
    const svg = document.querySelector('#svg')
    svg.classList.toggle('rotado')
    setSpecs(!specs)
  }
  const cubaBounds = [
    [18.0, -87.0], // Suroeste de Cuba
    [25.0, -74.0]  // Noreste de Cuba
];
  const [mostrar, setMostrar] = useState(false)

  const handleMostrar = () =>{
    setMostrar(!mostrar)
    // if (mostrar === false){
    //   setMunicipioSeleccionado("")
    //   setEscuela("")
    //   setProvSeleccionada()
    // }
  }
  const MapUpdater = ({ location }) => { 
    const map = useMap();
    if (location) { 
      console.log('te la eche adentro')
      map.setView([location.lat, location.lng], 10); // Cambia el nivel de zoom según sea necesario 
      } 
      return null; 
  };

  return (
    <div>
      <Buscador
        buscador = {buscador}
        setBuscador = {setBuscador}
        location={location}
        setLocation={setLocation}
      />
      <MapContainer
        zoom={7}
        center={[21.734,-79.783]}
        style={{ height: "100vh", width: "100%" }}
        maxBounds={cubaBounds}
        maxBoundsViscosity={1.0}
        minZoom={6}
        zoomControl={false}
        attributionControl = {false}
        scrollWheelZoom = {true}
      >
        <LocationMarker/>
        <MapUpdater
           location={location}
        />
        <EventComponentReportes
          setEscuela = {setEscuela}
          setMunicipioSeleccionado = {setMunicipioSeleccionado}
          setProvSeleccionada = {setProvSeleccionada}
          handleMostrar = {handleMostrar}
        />
        <NavBar handleMostrar={handleMostrar} />

        <ZoomControl position="topright"/>
        <LayersControl position="topright" >

          <BaseLayer checked name="Base Map">
            <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={2} />
          </BaseLayer>
          <BaseLayer name="Humanitarian">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="Topo Map">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="Cycle Map">
          <TileLayer
            url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"
            attribution="&copy; OpenCycleMap, OpenStreetMap contributors"
          />
        </BaseLayer>


          <Overlay name="provincias" checked>
            <WMSTileLayer
              url="http://localhost:8080/geoserver/LuisDaniel/wms"
              params={{
                service:'WMS',
                version:'1.1.1',
                request:'GetMap',
                format:'image/png',
                transparent:true,
                styles:'',
                srsName:'EPSG:4326',
                layers:'LuisDaniel:provincias',
                minZoom:-50,
                maxZoom:9,
              }}
            />
          </Overlay>

          <Overlay name="municipios" checked>
            <WMSTileLayer
              url="http://localhost:8080/geoserver/LuisDaniel/wms"
              params={{
                service:'WMS',
                version:'1.1.1',
                request:'GetMap',
                format:'image/png',
                transparent:true,
                styles:'',
                srsName:'EPSG:4326',
                layers:'LuisDaniel:municipios',
                minZoom:9,
                maxZoom:13,
              }}
            />
          </Overlay>
          <Overlay name="escuelas" checked>
            <WMSTileLayer
              url="http://localhost:8080/geoserver/LuisDaniel/wms"
              params={{
                service:'WMS',
                version:'1.1.1',
                request:'GetMap',
                format:'image/png',
                transparent:true,
                styles:'',
                srsName:'EPSG:4326',
                layers:'LuisDaniel:escuelas_cuba',
                minZoom:13
              }}
            />
          </Overlay>
        </LayersControl>

      </MapContainer>
      <button className="btn-specs" onClick={handleSpecs}><ArrowForwardIosIcon id="svg"/></button>
      <Reportes
        mostrar = {mostrar}
        handleMostrar = {handleMostrar}
        setMostrar = {setMostrar}
        escuela = {escuela}
        municipioSeleccionado = {municipioSeleccionado}
        provinciaSeleccionada = {provinciaSeleccionada}
        setEscuela = {setEscuela}
        setMunicipioSeleccionado = {setMunicipioSeleccionado}
        setProvSeleccionada = {setProvSeleccionada}
      />
      <Specs
        specs = {specs}
        handleSpecs = {handleSpecs}
        select = {select}
        setSelect = {setSelect}
        selectParticipantes = {selectParticipantes}
        setSelectParticipantes = {setSelectParticipantes}
      />

    </div>
  );
}

