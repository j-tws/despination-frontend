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
import { Route, HashRouter as Router, Link } from 'react-router-dom';


// const GMAPS_API_KEY = 'AIzaSyCl101Dkuw6zqcwqVETjEYyt5HgATs2WwU';
const GMAPS_API_KEY = 'AIzaSyDS2v9oBeTWLdjnaG0ZvVG1gYLxzmlVMGA';

const BASE_URL_DESTINATIONS_LOCATION = 'http://localhost:3000/destinations/locations'

function MyMarker( props ){
  return (
    <div className="mapMarker" onClick={ props.onThisClick }>
      {props.name}
      <div className="details">{props.address}</div>
    </div>
  )
}

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  console.log('places:', places);
  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.latitude,
      place.longitude,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

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
      console.log(`error loading destination:`, err);
      this.setState({loading: false, error: err})
    }

  }//fetchDestinations

  handleMarkerClick = (destinationId) => {
    console.log('Marker clicked:', destinationId);
    this.props.history.push(`/destinations/${destinationId}`)
    
  }

  handleMapClick = (ev) => {
    console.log(`Map clicked`, ev);
  }

  // TODO : instead of hardcoding the defaultCenter, it should be worked out by calculating "bounding box" for all the marker items you want to show; GMaps API can do this, check the google-map-react docs to see how to access the underlying Gmaps API behaviour;
  // OR see if Geocoder can do it for you using a bounding box method of the geocoded model?

  render(){
    let mapOptions = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ebe4db"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ebe4dc"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ebe4dc"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#8aaac1"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]    

    return (
      <div>
        {/* <h1 className="mapTitle">DesPination</h1> */}
          
        <div className="mapContainer">

          {
            this.state.loading
            ?
            (
              <p>Loading Map...</p>
            )
            :
            (
              <GoogleMapReact
                onClick={ this.handleMapClick }
                bootstrapURLKeys={ {key: GMAPS_API_KEY } }
                center={ {lat: 2, lng:28} }
                zoom={ 1 }
                options={{styles: mapOptions}} // this for the customised google map
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state.destinations)}
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
                        // address={destination.address} 
                        onThisClick={ () => this.handleMarkerClick(destination.id) }
                      />
                  ))
                }

                {/* 
                  If you create your own component tags here, and they have lat and lng props, then they will be rendered on this map! Exactly how they look depends on what tags the component renders
                */}


              </GoogleMapReact>

            )
          }

        </div>
      </div>
    )

  }



}

export default ReactMap