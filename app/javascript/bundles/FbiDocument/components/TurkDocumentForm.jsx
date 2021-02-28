import React from 'react';
import axios from 'axios';

import DigitalDocumentForm from './DigitalDocumentForm';


export default function TurkDocumentForm(props) {
  const { doc_id } = props;

async function initialSubmit(formData) {
  try {
    const token = 
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const resp = await axios.post('/turk_documents', {...formData, doc_id});
    console.log(resp);
  } catch (e) {
    console.log(e);
  } finally {
    console.log('all done');
  }
}
  return (
    <>
    <h1>Process a Document</h1> 
      <p><a 
        target="_blank"
        href={props.doc_url}>View Original Document
      </a></p>
      <DigitalDocumentForm 
        onSubmit={initialSubmit} />
    </>
  );
}
