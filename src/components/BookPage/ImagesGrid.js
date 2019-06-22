import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
// import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import { replaceImg } from '../../utils/text';

const styles = theme => ({
  container: {
    marginTop: theme.spacing(1),
  },
  gridList: {
    width: '100%',
  },
  subHeader: {
    textAlign: 'left',
    fontSize: '1.5rem',
    fontStyle: 'italic',
  },
});

const ImagesGrid = ({ classes, images, width }) => {
  const getGridListCols = () => {
    if (isWidthUp('xl', width)) {
      return 4;
    }

    if (isWidthUp('lg', width)) {
      return 3;
    }

    if (isWidthUp('md', width)) {
      return 2;
    }

    return 1;
  };

  return (
    <Container className={classes.container}>
      <GridList
        cellHeight="auto"
        spacing={5}
        className={classes.gridList}
        cols={getGridListCols()}
      >
        <GridListTile key="Subheader" disableGutters style={{ height: 'auto', width: '100%' }}>
          <ListSubheader className={classes.subHeader} component="h4">Images:</ListSubheader>
          {/* <Typography className={classes.subHeader} color="textSecondary"
          variant="h4" component="h4">Images:</Typography> */}
        </GridListTile>
        {images.map(imgURL => (
          <GridListTile key={imgURL} cols={1}>
            <img src={replaceImg(imgURL)} alt={imgURL} />
            {/* <img src={imgURL} alt={imgURL} /> */}
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
};

ImagesGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(ImagesGrid));
