import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlaceIcon from '@material-ui/icons/Place';
import CallIcon from '@material-ui/icons/Call';

const ResultDetailView = (props) => {
  const { place } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowX: 'auto',
      }}
    >
      <img alt="restaurant" src={place.backgroundImageURL} width="100%" />
      <List>
        <ListItem dense>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <Typography>{place.location.formattedAddress}</Typography>
        </ListItem>
        {Boolean(place.contact) && (
          <ListItem dense>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <Typography>{place.contact.formattedPhone}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  );
};

ResultDetailView.propTypes = {
  place: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  place: state.map.selectedPlace,
});

const mapActionToProps = () => ({});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultDetailView);
