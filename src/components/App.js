import React from 'react';
import { PropTypes } from 'prop-types';
import StoreProvider from './StoreProvider';
import Theme from './Theme';
import Toolbar from './Toolbar';
import { Wrapper, Bar, Content } from './Layout';
import Body from './Body';

const App = ({ store }) => (
  <StoreProvider store={store}>
    <>
      <Theme>
        <Wrapper>
          <Bar><Toolbar /></Bar>
          <Content>
            <Body />
          </Content>
        </Wrapper>
      </Theme>
    </>
  </StoreProvider>
);

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};
export default App;
