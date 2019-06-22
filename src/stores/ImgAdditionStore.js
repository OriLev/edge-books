import {
  decorate, observable, action, computed, autorun,
} from 'mobx';
import { fromPromise } from 'mobx-utils';
import isURL from '../utils/validators';
import { postNewImage } from '../utils/api';

import CONSTS from '../consts';

const {
  MESSAGES: { INVALID_URL_MESSAGE, POST_IMAGE_FAILED, POST_IMAGE_SUCCESSFUL },
} = CONSTS;

class ImgAdditionStore {
  constructor(appStore) {
    this.appStore = appStore;
    this.resetFormState = autorun(
      () => {
        if (this.appStore.view.currentPage.name === 'Book page') {
          this.resetObservables();
        }
      },
    );
  }

  get isImgURLIllegal() {
    return !isURL(this.imgURL);
  }

  get shouldShowURLInputError() {
    return this.isImgURLIllegal && this.imageAdditionAttempted;
  }

  get errorMessage() {
    if (this.isImgURLIllegal) {
      return INVALID_URL_MESSAGE;
    }
    if (this.imageAdditionResponse.state === 'rejected') {
      return POST_IMAGE_FAILED;
    }
    if (this.postingSuccessful) {
      return POST_IMAGE_SUCCESSFUL;
    }
    return '';
  }

  get postingInProgress() {
    return !!(this.imageAdditionResponse && this.imageAdditionResponse.state === 'pending');
  }

  get postingSuccessful() {
    return !!(this.imageAdditionResponse && this.imageAdditionResponse.state === 'fulfilled');
  }

  get isErrorState() {
    return this.shouldShowURLInputError || this.imageAdditionResponse.state === 'rejected';
  }

  resetImagePostingStatus = autorun(
    () => {
      if (this.imageAdditionResponse && this.imageAdditionResponse.state === 'rejected') {
        setTimeout(() => this.setImageAdditionResponse({}), 300000);
      }
      if (this.postingSuccessful) {
        setTimeout(() => {
          const { id } = this.appStore.data.books[0];
          this.resetObservables();
          this.appStore.view.showBook(id);
        }, 3000);
      }
    },
  );


  resetObservables = () => {
    this.updateImgURL('');
    this.setImageAdditionAttempted(false);
    this.setImageAdditionResponse({});
  }


  // ACTIONS....................................................................
  setImageAdditionAttempted(newValue) {
    this.imageAdditionAttempted = newValue;
  }

  setImageAdditionResponse(newValue) {
    this.imageAdditionResponse = newValue;
  }

  addImage(bookId) {
    this.setImageAdditionAttempted(true);
    if (!this.isImgURLIllegal) {
      const response = fromPromise(postNewImage(bookId, this.imgURL));
      this.setImageAdditionResponse(response);
    }
  }

  updateImgURL(newValue) {
    this.imgURL = newValue;
  }
}

decorate(ImgAdditionStore, {
  imgURL: observable,
  imageAdditionAttempted: observable,
  imageAdditionResponse: observable,
  isImgURLIllegal: computed,
  errorMessage: computed,
  shouldShowURLInputError: computed,
  postingInProgress: computed,
  updateImgURL: action,
  setImageAdditionAttempted: action,
  setImageAdditionResponse: action,
  addImage: action,
  resetObservables: action,
});

export default ImgAdditionStore;
