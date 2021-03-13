import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import TurkDocumentForm from './TurkDocumentForm';

export default function TurkDocumentFormContainer(props) {
  return (
    <Provider store={store}>
      <TurkDocumentForm
        {...props}/>
    </Provider>
  )
}
