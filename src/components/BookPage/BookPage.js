import { observer, inject } from 'mobx-react';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import Header from './Header';
import ImgAdditionForm from './ImgAdditionForm';
import BackButton from './BackButton';
import ImagesGrid from './ImagesGrid';

import CONSTS from '../../consts';

const {
  MESSAGES: { NO_IMAGES_FOR_THIS_BOOK },
} = CONSTS;

const styles = theme => ({
  bookContainer: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: '80%',
    minHeight: '80vh',
    margin: '10px auto auto',
    overflow: 'auto',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textAlign: 'center',
    zIndex: 50,
  },
});

const NoImages = () => (
  <Container>
    <Typography variant="h4" color="primary">
      {NO_IMAGES_FOR_THIS_BOOK}
    </Typography>
  </Container>
);

const BookPage = ({
  classes, data, router, bookId,
}) => {
  if (data.books.length > 0) {
    const book = data.getBookById(bookId);
    const images = data.getBookPhotos(book);
    return (
      <Paper className={classes.bookContainer} component="div">
        <BackButton goBack={router.goTo} />
        <Header title={data.getBookTitle(book)} author={data.getBookAuthor(book)} />
        <ImgAdditionForm bookId={bookId} />
        {
          images.length > 0
            ? <ImagesGrid images={images} />
            : <NoImages />
        }
      </Paper>
    );
  }
  return null;
};

BookPage.propTypes = {
  bookId: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default inject('data', 'router')(withStyles(styles)(observer(BookPage)));
