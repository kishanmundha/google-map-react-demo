import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Config from '../Config';
import Marker from './Marker';

const API_KEY = Config.googleMap.API_KEY;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 32.950787,
      lng: -96.821118,
    },
    zoom: 11,
  };

  state = {
    center: {
      lat: 32.950787,
      lng: -96.821118,
    },
    zoom: 11,
  };

  componentDidMount() {
    this.updateBoundry();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.places !== prevProps.places ||
      this.props.selected !== prevProps.selected
    ) {
      this.updateBoundry();
    }
  }

  updateBoundry = () => {
    const { selected } = this.props;

    if (selected) {
      this.setState({
        center: {
          lat: selected.location.lat,
          lng: selected.location.lng,
        },
      });
    } else {
      let minLat = 180;
      let minLng = 180;
      let maxLat = -180;
      let maxLng = -180;
      const { places } = this.props;

      places.forEach((place) => {
        if (place.location.lat < minLat) {
          minLat = place.location.lat;
        }
        if (place.location.lng < minLng) {
          minLng = place.location.lng;
        }
        if (place.location.lat > maxLat) {
          maxLat = place.location.lat;
        }
        if (place.location.lng > maxLng) {
          maxLng = place.location.lng;
        }
      });

      const bounds = {
        nw: {
          lat: minLat,
          lng: minLng,
        },
        se: {
          lat: maxLat,
          lng: maxLng,
        },
      };

      const size = {
        width:
          this.mapContainer.clientWidth - this.mapContainer.clientWidth * 0.1,
        height:
          this.mapContainer.clientHeight - this.mapContainer.clientHeight * 0.1,
      };

      if (bounds.nw.lat === bounds.se.lat && bounds.nw.lng === bounds.se.lng) {
        this.setState({
          zoom: 14,
          center: bounds.nw,
        });
      } else {
        const { center, zoom } = fitBounds(bounds, size);

        this.setState({
          zoom,
          center,
        });
      }
    }
  };

  render() {
    const { selected, places, hover } = this.props;
    const markers = places.map((place, index) => (
      <Marker
        key={index}
        lat={place.location.lat}
        lng={place.location.lng}
        place={place}
        selected={Boolean(selected) && selected.key === place.key}
        hover={Boolean(hover) && hover.key === place.key}
      />
    ));

    return (
      <div
        ref={(ref) => (this.mapContainer = ref)}
        style={{ height: '100%', width: '100%' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          zoom={this.state.zoom}
          center={this.state.center}
          options={{
            clickableIcons: false,
          }}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.array.isRequired,
  selected: PropTypes.object,
  hover: PropTypes.object,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  places: state.map.places,
  selected: state.map.selectedPlace,
  hover: state.map.hoverPlace,
});

const mapActionToProps = () => ({});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Map);
