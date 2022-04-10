import React, {useState, useEffect} from 'react'
import Map, {Marker, GeolocateControl, NavigationControl, ScaleControl, Layer, Source, Popup} from 'react-map-gl';
import { getNearbyAppointments } from '../../api';
import pin from './static/pin.png'
import pinblue from './static/pinblue.png'

//This is not an actual fucking hash map ... this is a real fucking map 

export default function NearbyMapMarkers({lat, long, setX}) {
    const [mapState, setMapState]=useState({longitude: 85.29009,
        latitude: 23.29577,
        zoom: 10})
    const [marker1State, setMarker1State]=useState({longitude: 85.2911, latitude: 23.298})
    const [marker2State, setMarker2State]=useState({longitude: 85.2911, latitude: 23.498})
    const [locList,setLocList]=useState([])
    const [showPopup, setShowPopUp]=useState(false)
    const geojson = {
        type: 'FeatureCollection',
        features: [
          {type: 'Feature', geometry: {type: 'LineString', coordinates:[ [marker1State.longitude, marker1State.latitude], [marker2State.longitude, marker2State.latitude] ]}}
        ]
      };
      
      const layerStyle = {
        id: 'point',
        type: 'line',
        paint: {
          'line-color': '#007cbf',
          'line-width': 3
        }
      };
    
    useEffect(async ()=>
    {
        const lat=23.2997292
        const long=85.2828262
        const {data}=await getNearbyAppointments({lat, long})
        console.log(data)
        setLocList(data)
    }, [])
    
    const showMarker=(info)=>
    {
        console.log(info)
        setX(info)   
    }
    
  return (
    <div className='mt-10 mx-auto grid justify-items-center'>
        <Map 
                
                initialViewState={mapState}
                style={{width: 640, height: 480}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiYWltYWNoaW5lcGF5IiwiYSI6ImNsMG1icnhkYzBvbWYzanBldXFiOTEwaTQifQ.bOskTywFWy--V4JT147AGA'
        >
            {
                locList.map((loc)=>(<Marker  longitude={loc.patientLongitude} latitude={loc.patientLatitude} anchor="bottom" >
                <img src={pin} onClick={()=>showMarker(loc)} style={{height: 50, width: 50}}/>
            </Marker>))
            }
           
            <Marker longitude={long} latitude={lat} anchor="bottom">
                <img src={pinblue} style={{height: 50, width: 50}} />
            </Marker>
            

            <NavigationControl />
            <ScaleControl />
            
        </Map>

    </div>
  )
}
