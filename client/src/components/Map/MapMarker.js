import React, {useState, useEffect} from 'react'
import Map, {Marker, GeolocateControl, NavigationControl, ScaleControl} from 'react-map-gl';
import pin from './static/pin.png'

//This is not an actual fucking hash map ... this is a real fucking map 

export default function MapMarker({mapState, setMapState}) {
   
    const [markerState, setMarkerState]=useState({longitude: 85.2911, latitude: 23.298})
    useEffect(()=>
    {
        console.log(mapState)
    }, [mapState])
    
    const handleLongitudeChange=(e)=>
    {
        const markerStateCopy=markerState
        setMarkerState({longitude: e.target.value, latitude: markerStateCopy.latitude})
    }

    const handleLatitudeChange=(e)=>
    {
        const markerStateCopy=markerState
        setMarkerState({longitude: markerStateCopy.longitude, latitude: e.target.value})
    }
    
  return (
    <div className='mt-10 mx-auto grid justify-items-center'>
        <Map 
                
                initialViewState={markerState}
                onMove={(evt)=>setMapState(evt.viewState)}
                style={{width: 360, height: 360}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiYWltYWNoaW5lcGF5IiwiYSI6ImNsMG1icnhkYzBvbWYzanBldXFiOTEwaTQifQ.bOskTywFWy--V4JT147AGA'
        >
            <GeolocateControl />
           <Marker longitude={mapState.longitude} latitude={mapState.latitude} anchor="bottom" >
                <img src={pin} style={{height: 50, width: 50}}/>
            </Marker>
            
            <NavigationControl />
            <ScaleControl />
        </Map>

        
    </div>
  )
}
