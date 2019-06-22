import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import BookPage from '../BookPage';
import BookList from '../BookList';


const getCurrentView = (view) => {
  const { name, data, message } = view.currentPage;
  if (data) {
    if (data.state === 'pending') {
      return <span>Loading</span>;
    }
    if (data.state === 'rejected') {
      return <span>Something went wrong... your data could not be fetched</span>;
    }
  }
  switch (name) {
    case 'Home':
      return <BookList />;
    case 'Book page':
      return <BookPage bookId={view.currentPage.bookId} />;
    default:
      return <span>{message}</span>;
  }
};

const Body = ({ view }) => (
  <>
    {
      getCurrentView(view)
    }
  </>
);

Body.propTypes = {
  view: PropTypes.shape({}).isRequired,
};

export default inject('view')(observer(Body));
