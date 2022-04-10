import React, {useEffect, useState} from 'react'
import Map, {Marker, GeolocateControl, NavigationControl} from 'react-map-gl';
import pin from './static/pin.png'

export default function MapPoint({latitudeVal, longitudeVal}) {
    const [mapState, setMapState]=useState({longitude: longitudeVal,
        latitude: latitudeVal,
        zoom: 14})

        const [coordinates, setCoordinates]=useState({
            latitude: 23.29577, longitude: 85.29009, zoom: 14
        })
      

       
  return (
    <div className='mx-auto mt-5 grid justify-items-center'>
       <Map   
                initialViewState={mapState}
                style={{width: 360, height: 360}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiYWltYWNoaW5lcGF5IiwiYSI6ImNsMG1icnhkYzBvbWYzanBldXFiOTEwaTQifQ.bOskTywFWy--V4JT147AGA'
        >
            <Marker longitude={longitudeVal} latitude={latitudeVal} anchor="bottom" >
                <img src={pin} style={{height: 50, width: 50}}/>
            </Marker>
            <NavigationControl />
        </Map>
    </div>
  )
}
