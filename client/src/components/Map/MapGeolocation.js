import React, {useEffect, useState} from 'react'
import Map, {Marker, GeolocateControl, NavigationControl} from 'react-map-gl';

export default function MapGeolocation() {
    const [mapState, setMapState]=useState({longitude: 85.29009,
        latitude: 23.29577,
        zoom: 14})

        const [coordinates, setCoordinates]=useState({
            latitude: 23.29577, longitude: 85.29009, zoom: 3
        })
        useEffect(()=>
        {
            navigator.geolocation.getCurrentPosition(pos=>{
                console.log(pos)
                setCoordinates({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
            })
        }, [])

        const geolocateControlRef = React.useCallback((ref) => {
            if (ref) {
              // Activate as soon as the control is loaded
              ref.trigger();
            }
          }, []);
  return (
    <div className='mx-auto mt-5 grid justify-items-center'>
       <Map   
                initialViewState={coordinates}
                style={{width: 360, height: 360}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiYWltYWNoaW5lcGF5IiwiYSI6ImNsMG1icnhkYzBvbWYzanBldXFiOTEwaTQifQ.bOskTywFWy--V4JT147AGA'
        >
            <GeolocateControl ref={geolocateControlRef}/>
            <NavigationControl />
        </Map>
    </div>
  )
}
