import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import GithubLinkButton from './GithubLinkButton';
import Title from './Title';

const Toolbar = ({ view }) => (
  <>
    <Title title={view.currentPage.title} />
    <GithubLinkButton />
  </>
);

Toolbar.propTypes = {
  view: PropTypes.shape({}).isRequired,
};

export default inject('view')(observer(Toolbar));
