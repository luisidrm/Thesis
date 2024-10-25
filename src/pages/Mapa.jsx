import NavBar from "../componentes/NavBar";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet";
import Buscador from "../componentes/Buscador";
import { useState } from "react";
import Reportes from "../componentes/Reportes";
import LocationMarker from "../componentes/LocationMarker";

export default function Mapa() {
  const { BaseLayer, Overlay } = LayersControl;
  const cubaBounds = [
    [18.0, -87.0], // Suroeste de Cuba
    [25.0, -74.0]  // Noreste de Cuba
];
  const [mostrar, setMostrar] = useState(false)

  const handleMostrar = () =>{
    setMostrar(!mostrar)
  }

  

  return (
    <div>
      <MapContainer
        zoom={7}
        center={[21.734,-79.783]}
        style={{ height: "100vh", width: "100%" }}
        maxBounds={cubaBounds}
        maxBoundsViscosity={1.0}
        minZoom={6}
        zoomControl={false}
        attributionControl = {false}
        >
        <LocationMarker/>
        <NavBar/>
        <Buscador/>
        <Reportes
          mostrar = {mostrar}
          handleMostrar = {handleMostrar}
          setMostrar = {setMostrar}
        />
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
                layers:'LuisDaniel:provincias',
                minZoom:-50,
                maxZoom:8,
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
                layers:'LuisDaniel:municipios',
                minZoom:9,
                maxZoom:12,
              }}
            />
          </Overlay>
        </LayersControl>

      </MapContainer>

    </div>
  );
}

// BBOX=-82.47486299747875,20.318137793479906,-75.3169135362895,23.39381920258466
// bbox=-9079495.967826378,2191602.474992575,-8766409.899970295,2504688.542848655
//         {/* <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <WMSTileLayer
//         url="http://localhost:8080/geoserver/GeoPortal/wms?request=GetMap"
//         layers="GeoPortal:test1" // Reemplaza con tu workspace y nombre de capa
//         format="image/png"
//         transparent={false}
//       /> */}
//   // const [provincias, setProvincias] = useState([]);
//   // const [municipios, setMunicipios] = useState([]);

//   // useEffect(()=>{
//   //   fetch("http://localhost:8000/geo",{method:"GET"})
//   //   .then((response) => response.json())
//   //   .then((data) => {
//   //     let p = Array.from(data.provincia);
//   //     let m = Array.from(data.municipio);
//   //     setProvincias(p);
//   //     setMunicipios(m);
//   //     console.log(JSON.stringify(data));
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error al obtener datos:", error);
//   //   })
//   // },[])
//   // console.log(provincias)
//   // console.log(municipios)
//   // var baseLayer = L.tileLayer("")