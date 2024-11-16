import { useMapEvents } from "react-leaflet";
import axios from 'axios'

export default function EventComponentReportes(props){
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const zoom = map.getZoom()
      if(zoom < 9){
        const responseProv = await axios.get(
          "http://localhost:8080/geoserver/LuisDaniel/wfs",
          {
            params: {
              service: "WFS",
              version: "1.1.0",
              request: "GetFeature",
              typeName: "LuisDaniel:provincias",
              outputFormat: "application/json",
              srsname: "EPSG:4326",
              cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
              // bbox: `${lng},${lat},${lng+0.04},${lat+0.04},EPSG:4326`,
            },
          }
        );
        const featuresProv = responseProv.data.features;
        props.setProvSeleccionada(featuresProv[0].properties.provincia);
        props.handleMostrar();
      }else{
        if(zoom > 9 && zoom < 12){
          const responseProv = await axios.get(
            "http://localhost:8080/geoserver/LuisDaniel/wfs",
            {
              params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "LuisDaniel:provincias",
                outputFormat: "application/json",
                srsname: "EPSG:4326",
                cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
                // bbox: `${lng},${lat},${lng+0.04},${lat+0.04},EPSG:4326`,
              },
            }
          );
          const response = await axios.get(
            "http://localhost:8080/geoserver/LuisDaniel/wfs",
            {
              params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "LuisDaniel:municipios",
                outputFormat: "application/json",
                srsname: "EPSG:4326",
                cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
                // bbox: `${lng},${lat},${lng},${lat},EPSG:4326`,
              },
            }      
          );
          const features = response.data.features;
          const featuresProv = responseProv.data.features;

          props.setMunicipioSeleccionado(features[0].properties.municipio);
          props.setProvSeleccionada(featuresProv[0].properties.provincia);
          props.handleMostrar();
        }else{
          const responseProv = await axios.get(
            "http://localhost:8080/geoserver/LuisDaniel/wfs",
            {
              params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "LuisDaniel:provincias",
                outputFormat: "application/json",
                srsname: "EPSG:4326",
                cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
                // bbox: `${lng},${lat},${lng+0.04},${lat+0.04},EPSG:4326`,
              },
            }
          );
          const response = await axios.get(
            "http://localhost:8080/geoserver/LuisDaniel/wfs",
            {
              params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "LuisDaniel:municipios",
                outputFormat: "application/json",
                srsname: "EPSG:4326",
                cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
                // bbox: `${lng},${lat},${lng},${lat},EPSG:4326`,
              },
            }      
          );
          const responseEsc = await axios.get(
            "http://localhost:8080/geoserver/LuisDaniel/wfs",
            {
              params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "LuisDaniel:escuelas_cuba",
                outputFormat: "application/json",
                srsname: "EPSG:4326",
                // cql_filter: `BBOX(geom, ${lng}, ${lat}, ${lng+0.04}, ${lat+0.04}, 'EPSG:4326')`
                bbox: `${lng},${lat},${lng+0.0},${lat+0.05},EPSG:4326`
              },
            }
          );
          const features = response.data.features;
          const featuresProv = responseProv.data.features;
          const featuresEsc = responseEsc.data.features;

          if (features.length > 0) {
            if (featuresEsc.length > 0) {
              props.setEscuela(featuresEsc[0].properties.name)
            }else{
              props.setEscuela("")
            }
            props.setMunicipioSeleccionado(features[0].properties.municipio);
            props.setProvSeleccionada(featuresProv[0].properties.provincia);
            props.handleMostrar();
          }
        }
      }
      // const responseProv = await axios.get(
      //   "http://localhost:8080/geoserver/LuisDaniel/wfs",
      //   {
      //     params: {
      //       service: "WFS",
      //       version: "1.1.0",
      //       request: "GetFeature",
      //       typeName: "LuisDaniel:provincias",
      //       outputFormat: "application/json",
      //       srsname: "EPSG:4326",
      //       cql_filter:`INTERSECTS(geom, POINT(${lat} ${lng}))`,
      //       // bbox: `${lng},${lat},${lng+0.04},${lat+0.04},EPSG:4326`,
      //     },
      //   }
      // );
      // const responseEsc = await axios.get(
      //   "http://localhost:8080/geoserver/LuisDaniel/wfs",
      //   {
      //     params: {
      //       service: "WFS",
      //       version: "1.1.0",
      //       request: "GetFeature",
      //       typeName: "LuisDaniel:escuelas_cuba",
      //       outputFormat: "application/json",
      //       srsname: "EPSG:4326",
      //       bbox: `${lng},${lat},${lng+0.04},${lat+0.04},EPSG:4326`,
      //     },
      //   }
      // );
      // const features = response.data.features;
      // const featuresProv = responseProv.data.features;
      // const featuresEsc = responseEsc.data.features;
      // if (features.length > 0) {
      //   console.log(featuresEsc)
      //   if (featuresEsc.length > 0) {
      //     props.setEscuela(featuresEsc[0].properties.name)
      //   }else{
      //     props.setEscuela("")
      //   }
      //   props.setMunicipioSeleccionado(features[0].properties.municipio);
      //   props.setProvSeleccionada(featuresProv[0].properties.provincia);
      //   console.log('Te la eche adentro')
      //   props.handleMostrar();
      // }
      // document.getElementsByClassName('reportes').focus()
    },
  });
  return(
    <div></div>
  )
}