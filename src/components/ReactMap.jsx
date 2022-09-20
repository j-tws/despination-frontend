import React from 'react'
import './ReactMap.css'
// Why do we need a package?
// For a non-React page, ie a Rails template, we can just
// use a <script> tag to load the Gmaps API and add markers
// in vanilla JS
// BUT because the Google Maps JS the script tag loads directly
// accesses the DOM, it will break if we try to do that in React
// ... so as with any DOM-related library, when using React 
// we generally need to find a 'react wrapper' or React version of that library so that React + library are not fighting over the DOM
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

const GMAPS_API_KEY = 'AIzaSyCl101Dkuw6zqcwqVETjEYyt5HgATs2WwU';
const BASE_URL_DESTINATIONS_LOCATION = 'http://localhost:3000/destinations/locations'

function MyMarker( props ){
  return (
    <div className="mapMarker" onClick={ props.onThisClick }>
      {props.name}
      <div className="details">{props.address}</div>
    </div>
  )
}

class ReactMap extends React.Component {

  state = {
    destinations: [],
    loading: true,
    error: null

  }

  componentDidMount(){

    this.fetchDestinations()

  }

  fetchDestinations = async() => {

    try {
      // TODO: get user location from Geolocation browser API
      // and set lat, lng to your backend as part of a AJAX request -
      // then your controller can use them for Mixtape.near query!
      // YOu could additionally let the user select a search from a dropdown
      // and send that to the backend too, to use with the .near() query

      const res = await axios.get(BASE_URL_DESTINATIONS_LOCATION);
  
      console.log('response:', res.data);
      this.setState({ loading:false, destinations: res.data})

    }catch(err){
      console.log(`error loading mixtapes:`, err);
      this.setState({loading: false, error: err})
    }

  }//fetchDestinations

  handleMarkerClick = (destinationId) => {
    console.log('Marker clicked:', destinationId);
  }

  handleMapClick = (ev) => {
    console.log(`Map clicked`, ev);
  }

  // TODO : instead of hardcoding the defaultCenter, it should be worked out by calculating "bounding box" for all the marker items you want to show; GMaps API can do this, check the google-map-react docs to see how to access the underlying Gmaps API behaviour;
  // OR see if Geocoder can do it for you using a bounding box method of the geocoded model?

  render(){

    return (
      <div>
        <h1 className="mapTitle">Test Map</h1>
          
        <div className="mapContainer">

          <GoogleMapReact
            onClick={ this.handleMapClick }
            bootstrapURLKeys={ {key: GMAPS_API_KEY } }
            defaultCenter={ {lat: -33.7536, lng: 151.2886} }
            defaultZoom={ 7 }
          >
            {/* can wrap component around a div */}
            {/*
            <MyMarker lat={-20.7536} lng={101.2886} />
            <MyMarker lat={-18.7536} lng={121.2886} />
            */}

            {
              this.state.destinations.map( destination => (
                <MyMarker 
                  name={destination.name} 
                  key={destination.id} 
                  lat={destination.latitude} 
                  lng={destination.longitude} 
                  address={destination.address} 
                  onThisClick={ () => this.handleMarkerClick(destination.id) }
                />
              ))
            }

            {/* 
              If you create your own component tags here, and they have lat and lng props, then they will be rendered on this map! Exactly how they look depends on what tags the component renders
            */}


          </GoogleMapReact>

        </div>
          
          
      </div>
    )

  }



}

export default ReactMap