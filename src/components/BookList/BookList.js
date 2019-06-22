import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BookCard from '../BookCard';
import CONSTS from '../../consts';

const { SINGLE_BOOK_ROUTE } = CONSTS.ROUTING;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: `${theme.spacing(2)}px`,
    margin: 'auto',
    maxWidth: 1300,
  },
  container: {
    listStyle: 'none',
  },
});

const BookList = ({ data, router, classes }) => (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container spacing={8} className={classes.container} component="ul">
        {data.books.map(book => (
          <Grid key={book.id} item lg={4} md={6} xs={12} component="li">
            <BookCard book={book} component="a" role="button" onClick={() => router.goTo(`${SINGLE_BOOK_ROUTE}/${book.id}`)} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  </div>
);

BookList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default inject('data', 'router')(withStyles(styles)(observer(BookList)));
