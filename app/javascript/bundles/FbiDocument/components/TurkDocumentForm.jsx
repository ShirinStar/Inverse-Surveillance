import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';

import DigitalDocumentForm from './DigitalDocumentForm';


export default function TurkDocumentForm(props) {
  const { docId, pageCount, existingFields } = props;
  const [ digitalDocument, setDocument ] = useState(null);
  const [ fields, setFields ] = useState([]);

  async function initialSubmit(formData) {
    try {
      const token = 
        document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token

      const resp = await axios.post('/turk_documents', {...formData, docId});

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
      setFields([...fields, resp.data]);
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
      <div className="form-doc-container">
        <div className="form-container">
          {digitalDocument === null ? (
            <DigitalDocumentForm 
              onSubmit={initialSubmit} />
          ) : (
            <FieldForm 
              pageCount={pageCount}
              existingFields={existingFields}
              saveField={saveField}
              digitalDocument={digitalDocument}
            />
          )}
        </div>
        <div className="field-container">
          {fields.map(field => (
            <div key={field.id}>
              <p>{field.label}</p>
              <p>{field.text_body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
