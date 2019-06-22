import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import EventListener from 'react-event-listener';

const styles = () => ({
  wrapper: {
    zIndex: 1,
    height: '100vh',
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },
});

const StyledWrapper = withStyles(styles)(({ classes, ...rest }) => (
  <div className={classes.wrapper} {...rest} />
));

const Wrapper = ({ children, view }) => (
  <StyledWrapper>
    {children}
    <EventListener target="window" onResize={view.onScreenResize} />
  </StyledWrapper>
);

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  view: PropTypes.shape({}).isRequired,
};

export default inject('view')(Wrapper);
