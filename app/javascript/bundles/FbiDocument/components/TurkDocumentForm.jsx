import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';

import DigitalDocumentForm from './DigitalDocumentForm';


export default function TurkDocumentForm(props) {
  const { doc_id, page_count } = props;
  const [ digitalDocument, setDocument ] = useState(null);

  async function initialSubmit(formData) {
    try {
      const token = 
        document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token

      const resp = await axios.post('/turk_documents', {...formData, doc_id});

      setDocument(resp.data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('all done');
    }
  }

  async function saveField(field) {
    console.log(field);
      const token = 
        document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    try {

    const resp = await axios.post(`/turk_documents/${digitalDocument.id}/fields`, field);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('done submitting field');
    }
  }
  return (
    <>
      <h1>Process a Document</h1> 
      <p><a 
        target="_blank"
        href={props.doc_url}>View Original Document
      </a></p>
      {digitalDocument === null ? (
      <DigitalDocumentForm 
        onSubmit={initialSubmit} />
      ) : (
        <FieldForm 
          page_count={page_count}
          saveField={saveField}
          digitalDocument={digitalDocument}
        />
      )}
    </>
  );
}
