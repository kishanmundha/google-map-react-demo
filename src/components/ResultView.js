import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { SET_SELECTED_PLACE } from '../reducers/MapAction';
import ResultListView from './ResultListView';
import ResultDetailView from './ResultDetailView';

class ResultView extends Component {
  render() {
    const { selected } = this.props;
    const isDetailView = Boolean(selected);

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              style={{
                marginLeft: isDetailView ? -12 : -68,
                marginRight: 20,
                opacity: isDetailView ? 1 : 0,
                transition: 'margin-left 300ms ease-in, opacity 300ms ease-in',
              }}
              color="inherit"
              aria-label="Menu"
              onClick={this.props.backToList}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {isDetailView ? selected.name : 'Restaurants'}
            </Typography>
          </Toolbar>
        </AppBar>
        {!isDetailView && <ResultListView />}
        {isDetailView && <ResultDetailView />}
      </div>
    );
  }
}

ResultView.propTypes = {
  selected: PropTypes.object,
  backToList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({
  backToList: () =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place: null,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultView);
