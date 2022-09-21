import React from 'react'
// import './ReactMapDestination.css'
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

const BASE_URL = 'http://localhost:3000'

function MyMarker( props ){
  return (
    <div className="mapMarkerDes" onClick={ props.onThisClick }>
      {props.name}
      <div className="details">{props.address}</div>
    </div>
  )
}


class ReactMapDestination extends React.Component{

    state = {
    destinations: {},
    attractions: [],
    events:[],

    loading: true,
    error: null

  }

  componentDidMount(){

    this.fetchAttractions(this.props.destinationId)

  }

  fetchAttractions = async(id) => {

    //   console.log(`id:,`,id)
    try {
      // TODO: get user location from Geolocation browser API
      // and set lat, lng to your backend as part of a AJAX request -
      // then your controller can use them for Mixtape.near query!
      // YOu could additionally let the user select a search from a dropdown
      // and send that to the backend too, to use with the .near() query

      const res = await axios.get(`${BASE_URL}/destinations/${id}`);
    //   console.log('response:', res.data.destination);  
    //   console.log('response:', res.data.destination.address);  
    //   console.log('response:', res.data.destination.attractions);  

        this.setState({ 
            // destination: res.data.destination,
            // address: res.data.destination.address,
            attractions: res.data.destination.attractions
            
        })

        }catch(err){
        console.log(`error loading attraction:`, err);
        this.setState({loading: false, error: err})
        }

  }//fetchAttractions

  handleMarkerClick = (attractionId) => {
    console.log('Marker clicked:', attractionId);
    this.props.history.push(`/attractions/${attractionId}`)
    
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
      
          
        <div className="mapContainerDes">

          <GoogleMapReact
            onClick={ this.handleMapClick }
            bootstrapURLKeys={ {key: GMAPS_API_KEY } }
            defaultCenter={ {lat: 2, lng:28} }
            defaultZoom={ 7 }
            options={{styles: mapOptions}} // this for the customised google map
          >

            {
              this.state.attractions.map( attraction => (
                  <MyMarker 
                    name={attraction.name} 
                    key={attraction.id} 
                    lat={attraction.latitude} 
                    lng={attraction.longitude} 
                    // address={attraction.address} 
                    onThisClick={ () => this.handleMarkerClick(attraction.id) }
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

export default ReactMapDestination

