import {
  SET_PLACE_RESULTS,
  SET_SELECTED_PLACE,
  SET_HOVER_PLACE,
  SET_BOUNDRY,
} from './MapAction';

const initState = {
  places: [],
  selectedPlace: null,
  hoverPlace: null,
  zoom: 11,
  center: {
    lat: 32.950787,
    lng: -96.821118,
  },
};

const setPlaceResults = (state, action) => {
  return {
    ...state,
    places: action.places || [],
  };
};

const setSelectedPlace = (state, action) => {
  return {
    ...state,
    selectedPlace: action.place,
    hoverPlace: null,
  };
};

const setHoverPlace = (state, action) => {
  return {
    ...state,
    hoverPlace: action.place,
  };
};

const setBoundry = (state, action) => {
  return {
    ...state,
    center: action.center,
    zoom: action.zoom,
  };
};

const reducerMethods = {
  [SET_PLACE_RESULTS]: setPlaceResults,
  [SET_SELECTED_PLACE]: setSelectedPlace,
  [SET_HOVER_PLACE]: setHoverPlace,
  [SET_BOUNDRY]: setBoundry,
};

const MapReducer = (state = initState, action) => {
  if (reducerMethods[action.type]) {
    return reducerMethods[action.type](state, action);
  }

  return state;
};

export default MapReducer;
