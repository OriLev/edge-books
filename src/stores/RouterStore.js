import {
  decorate, observable, action,
} from 'mobx';
import { createBrowserHistory } from 'history';
import CONSTS from '../consts';

class RouterStore {
  constructor(appStore) {
    this.appStore = appStore;
    this.history = createBrowserHistory({
      basename: process.env.PUBLIC_URL,
      forceRefresh: false,
    });
    this.setPathname(this.history.location.pathname);
    this.history.listen((location) => {
      this.setPathname(location.pathname);
    });
  }

  // OBSERVABLES................................................................
  pathname = '';

  // COMPUTEDS..................................................................
  convertRouteToState = () => {
    const { MISSING_PARAMS_MSG, TOO_MANY_PARAMS_MSG } = CONSTS.ROUTING;
    const pageParams = this.pathname.split('/').slice(1);
    const { showHome, showBook, showError } = this.appStore.view;
    const showView = (legalLength, displayFunc) => (
      pageParams.length === legalLength
        ? displayFunc()
        : showError(pageParams.length < legalLength ? MISSING_PARAMS_MSG : TOO_MANY_PARAMS_MSG)
    );
    const page = pageParams[0];
    switch (page) {
      case '':
        showView(1, () => showHome());
        break;
      case 'book':
        showView(2, () => showBook(pageParams[1]));
        break;
      default:
        showError('404 - route does not exist');
    }
  }

  // ACTIONS....................................................................
  goTo = (route = '/') => {
    this.history.push(route);
  }

  setPathname = (pathname) => {
    this.pathname = pathname;
    this.convertRouteToState();
  }
}


decorate(RouterStore, {
  pathname: observable,
  goTo: action,
  setPathname: action,
  convertRouteToState: action,
});

export default RouterStore;
