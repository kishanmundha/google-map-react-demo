import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import './App.css';
import result from './result.json';

import { SET_PLACE_RESULTS, SET_SELECTED_PLACE } from './reducers/MapAction';

import Map from './components/Map';
import ResultView from './components/ResultView';

result.restaurants.forEach((place, index) => {
  place.key = index;
});

const styles = (theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  resultViewContainer: {
    width: 400,
    minWidth: 400,
    boxShadow: '-10px 0px 30px black',
    [theme.breakpoints.down('sm')]: {
      width: 300,
      minWidth: 300,
    },
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
      width: '100%',
      minWidth: '100%',
      height: '50vh',
    },
    transition: 'height 300ms ease-in',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '50vh',
      opacity: 1,
      visibility: 'visible',
    },
    transition: 'opacity 300ms ease-in, visibility 300ms ease-in',
  },
});

class App extends Component {
  componentDidMount() {
    this.props.setSearchResult(result.restaurants);
  }

  render() {
    const { classes, selected, width } = this.props;
    let isMobile = isWidthDown('xs', width);

    const resultViewStyles = {};
    const mapStyles = {};

    if (selected && isMobile) {
      resultViewStyles.height = '100vh';
      mapStyles.opacity = 0;
      mapStyles.visibility = 'hidden';
    }

    return (
      <div className={classes.root}>
        <div className={classes.resultViewContainer} style={resultViewStyles}>
          <ResultView />
        </div>
        <div className={classes.mapContainer} style={mapStyles}>
          <Map />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  setSearchResult: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  width: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({
  setSearchResult: (places) =>
    dispatch({
      type: SET_PLACE_RESULTS,
      places,
    }),
  setSelectedPlace: (place) =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(App)));
