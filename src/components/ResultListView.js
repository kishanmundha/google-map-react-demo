import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { SET_SELECTED_PLACE, SET_HOVER_PLACE } from '../reducers/MapAction';

const ResultListView = (props) => {
  const { places, onSelectPlace, onHoverPlace } = props;
  return (
    <div style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
      <List>
        {places.map((place, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider />}
            <ListItem
              button
              style={{
                alignItems: 'flex-start',
              }}
              onClick={() => onSelectPlace(place)}
              onMouseEnter={() => onHoverPlace(place)}
              onMouseLeave={() => onHoverPlace(null)}
            >
              <div style={{ flex: 1 }}>
                <Typography variant="subtitle1">{place.name}</Typography>
                <Typography variant="caption">
                  {place.location.formattedAddress}
                </Typography>
              </div>
              <div>
                <img
                  alt="img"
                  src={place.backgroundImageURL}
                  style={{ width: 72, height: 72 }}
                />
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

ResultListView.propTypes = {
  places: PropTypes.array.isRequired,
  onSelectPlace: PropTypes.func.isRequired,
  onHoverPlace: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  places: state.map.places,
});

const mapActionToProps = (dispatch) => ({
  onSelectPlace: (place) =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place,
    }),
  onHoverPlace: (place) =>
    dispatch({
      type: SET_HOVER_PLACE,
      place,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultListView);
