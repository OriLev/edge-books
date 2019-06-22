import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { replaceImg } from '../../utils/text';

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
    height: 400,
    overflow: 'hidden',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    display: 'flex',
    position: 'relative',
    zIndex: 50,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  media: {
    height: 400,
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    '&>div': {
      background: 'rgba(0, 0, 0, 0.4)',
    },
  },
  content: {
    zIndex: 5,
    width: '100%',
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  additionalImages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[400],
    position: 'absolute',
    right: '20px',
    bottom: '20px',
  },
});

const BookCard = ({ book, ...rest }) => (
  book.photos.length > 0
    ? <MediaCard {...rest} book={book} />
    : <PlainCard {...rest} book={book} />
);

const Content = ({ classes, book, variant }) => (
  <CardContent className={classes.content}>
    <Typography gutterBottom align="center" variant="h5" component="h5" color={variant === 'media' ? 'textPrimary' : 'textSecondary'}>
      {book.title}
    </Typography>
    <Typography gutterBottom variant="body1" component="p" color={variant === 'media' ? 'textPrimary' : 'textSecondary'}>
      {book.author}
    </Typography>
    {
        book.photos.length > 1
          ? <span className={classes.additionalImages}>{`+${book.photos.length - 1}`}</span>
          : null
    }
  </CardContent>
);

const PlainCard = ({
  classes, book, component, onClick,
}) => (
  <Card className={classes.card} component={component} onClick={onClick}>
    <Content book={book} classes={classes} variant="plain" />
  </Card>
);

const MediaCard = ({
  classes, book, component, onClick,
}) => {
  const newImage = replaceImg(book.photos[0]);
  return (
    <Card className={classes.card} component={component} onClick={onClick}>
      <CardMedia
        className={classes.media}
        image={newImage}
        title={book.title}
      >
        <Content classes={classes} book={book} variant="media" />
      </CardMedia>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({}).isRequired,
};

PlainCard.propTypes = {
  book: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  component: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

MediaCard.propTypes = {
  book: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  component: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Content.propTypes = {
  book: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  variant: PropTypes.string.isRequired,
};

export default withStyles(styles)(BookCard);
