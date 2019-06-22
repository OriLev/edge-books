import {
  decorate, observable, action, computed,
} from 'mobx';
import normalize from 'json-api-normalizer';

class DataStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  // OBSERVABLES................................................................
  rawData = {};

  // COMPUTEDS..................................................................
  get normalizedData() {
    return this.rawData ? normalize(this.rawData) : {};
  }

  get books() {
    return this.normalizedData.books
      ? this.getDataCollection('books')
        .map(book => ({
          id: this.getBookId(book),
          title: this.getBookTitle(book),
          author: this.getBookAuthor(book),
          photos: this.getBookPhotos(book),
        }))
      : [];
  }

  // ACTIONS....................................................................
  setData = (data) => {
    this.rawData = data;
  };

  // HELPER METHODS.............................................................
  getDataCollection = type => (
    this.normalizedData[type]
      ? Object.values(this.normalizedData[type])
      : []
  );

  getBookById = id => this.normalizedData.books[id];

  getBookId = book => book.id;

  getBookTitle = book => book.attributes.title;

  getBookAuthor = (book) => {
    const { type, id } = this.getBookRelationshipData(book, 'author');
    return this.getAttributeByIdAndType({ type, id, attribute: 'name' });
  }

  getBookPhotos = (book) => {
    const photosData = this.getBookRelationshipData(book, 'photos');
    return photosData.map(({ type, id }) => this.getAttributeByIdAndType({ type, id, attribute: 'uri' }));
  }

  getBookRelationshipData = (book, relationship) => book.relationships[relationship].data;

  getAttributeByIdAndType = ({ type, id, attribute }) => (
    this.normalizedData[type][id].attributes[attribute]
  );
}

decorate(DataStore, {
  rawData: observable,
  normalizedData: computed,
  books: computed,
  setData: action,
});

export default DataStore;
