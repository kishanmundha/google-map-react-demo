import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaceIcon from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SET_SELECTED_PLACE, SET_HOVER_PLACE } from '../reducers/MapAction';

const styles = {
  popup: {
    position: 'absolute',
    top: -120,
    left: -110,
    width: 300,
    zIndex: 1000,
    opacity: 0,
    '&:before': {
      content: "' '", //eslint-disable-line
      position: 'absolute',
      top: '100%',
      left: '100px',
      width: '0',
      borderTop: '20px solid white',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
    },
    transition: 'opacity 300ms linear, top 200ms linear',
  },
};

class Marker extends Component {
  componentDidMount() {
    this.updatePopupPosition();
  }

  componentDidUpdate() {
    this.updatePopupPosition();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.place.key !== this.props.place.key) {
      return true;
    }

    if (nextProps.selected !== this.props.selected) {
      return true;
    }

    if (nextProps.hover !== this.props.hover) {
      return true;
    }

    return false;
  }

  updatePopupPosition() {
    if (this.popupRef) {
      this.popupRef.style.top = 0 - this.popupRef.clientHeight - 60 + 'px';
      this.popupRef.style.opacity = 1;
    }
  }

  onHoverPlace = (place) => {
    if (!this.props.selected) {
      this.props.onHoverPlace(place);
    }
  };

  onSelectPlace = () => {
    if (!this.props.selected) {
      this.props.onSelectPlace(this.props.place);
    }
  };

  render() {
    const { selected, place, hover, closePopup } = this.props;
    const size = 'default';

    return (
      <div>
        <PlaceIcon
          style={{
            transform: `scale(${selected || hover ? 2 : 1}, ${
              selected || hover ? 2 : 1
            })`,
            transformOrigin: '50% 100% 0px',
            transition: 'transform 100ms',
            color: 'darkred',
            cursor: 'pointer',
            position: 'absolute',
            left: -10,
            top: -24,
          }}
          // color="secondary"
          fontSize={size}
          onMouseEnter={() => this.onHoverPlace(place)}
          onMouseLeave={() => this.onHoverPlace(null)}
          onClick={this.onSelectPlace}
        />
        {selected && (
          <div
            ref={(ref) => (this.popupRef = ref)}
            className={this.props.classes.popup}
          >
            <Paper style={{ padding: 8 }}>
              <IconButton
                title="Close"
                style={{ float: 'right', width: 24, height: 24, padding: 0 }}
                onClick={closePopup}
              >
                <CloseIcon style={{ fontSize: 12 }} />
              </IconButton>
              <Typography variant="subtitle2">{place.name}</Typography>
              <Typography>{place.location.formattedAddress}</Typography>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  place: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onHoverPlace: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapActionToProps = (dispatch) => ({
  closePopup: () =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place: null,
    }),
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
)(withStyles(styles)(Marker));
