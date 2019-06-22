import {
  decorate, observable, action, autorun,
} from 'mobx';
import { fromPromise } from 'mobx-utils';
import { fecthBookList, fetchBook } from '../utils/api';

class ViewStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  // OBSERVABLES................................................................
  currentPage = {};

  // ACTIONS....................................................................
  showHome = () => {
    this.currentPage = {
      name: 'Home',
      title: 'Home',
      data: fromPromise(fecthBookList()),
    };
  };

  showBook = (bookId) => {
    this.currentPage = {
      name: 'Book page',
      bookId,
      title: `Book #${bookId}`,
      data: fromPromise(fetchBook(bookId)),
    };
  };

  showError = (message = 'Something went wrong') => {
    this.currentPage = {
      name: 'error',
      message,
    };
  };

  // AUTORUNS....................................................................
  updateData = autorun(
    () => {
      if (this.currentPage.data) {
        return this.currentPage.data.state === 'fulfilled'
          ? this.appStore.data.setData(this.currentPage.data.value)
          : null;
      }
      return null;
    },
  )
}

decorate(ViewStore, {
  currentPage: observable,
  showHome: action,
  showBook: action,
  showError: action,
});

export default ViewStore;
