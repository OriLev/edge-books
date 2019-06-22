import { configure } from 'mobx';

import ViewStore from './ViewStore';
import RouterStore from './RouterStore';
import DataStore from './DataStore';
import ImgAdditionStore from './ImgAdditionStore';

configure({ enforceActions: 'observed' });

export default class AppStore {
  constructor() {
    this.view = new ViewStore(this);
    this.router = new RouterStore(this);
    this.data = new DataStore(this);
    this.imgAddition = new ImgAdditionStore(this);
  }
}
