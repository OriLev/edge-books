import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    padding: theme.spacing(2),
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

});

const BookHeader = ({
  classes, title, author,
}) => (
  <Container className={classes.container}>
    <Typography variant="h3" color="textSecondary">{title}</Typography>
    <Typography variant="body2" color="textSecondary">by</Typography>
    <Typography variant="h5" color="textSecondary">{author}</Typography>
  </Container>
);


BookHeader.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(BookHeader);
