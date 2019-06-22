import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';

const styles = theme => ({
  backButton: {
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    transitionDelay: `${theme.transitions.duration.leavingScreen}ms`,
  },
});

const BackButton = ({
  classes, goBack,
}) => {
  const fab = {
    color: 'secondary',
    className: classes.backButton,
    icon: <ArrowLeft />,
    label: 'Go back to Book List',
  };
  return (
    <Fab
      aria-label={fab.label}
      className={fab.className}
      color={fab.color}
      onClick={() => goBack('/')}
      title="Back to Book List"
    >
      {fab.icon}
    </Fab>
  );
};

BackButton.propTypes = {
  goBack: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(BackButton);
