import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';

import DigitalDocumentForm from './DigitalDocumentForm';


export default function TurkDocumentForm(props) {
  const { docId, pageCount, existingFields } = props;
  const [digitalDocument, setDocument] = useState(null);
  const [fields, setFields] = useState([]);
  const [startSerialNumber, setStartSerialNumber] = useState('')

  async function initialSubmit(formData) {
    try {
      const token =
        document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token

      const resp = await axios.post('/turk_documents', { ...formData, docId });

      setDocument(resp.data);
      setStartSerialNumber(formData.startPageSerialNumber)
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

  function clearFields() {
    setFields([]);
  }

  return (
    <div>
      <div className="form-doc-container">
        <div className="form-container">
          {digitalDocument === null ? (
            <DigitalDocumentForm
              onSubmit={initialSubmit} 
              docUrl={props.docUrl}/>
          ) : (
              <FieldForm
                pageCount={pageCount}
                existingFields={existingFields}
                saveField={saveField}
                digitalDocument={digitalDocument}
                clearFields={clearFields}
                docUrl={props.docUrl}
                hasFields={fields.length > 0}
                pageSerialNumber={startSerialNumber}
                setPageSerialNumber={setStartSerialNumber}
              />
            )}
        </div>
        <div className='adding-field'>
          {digitalDocument != null && fields.length > 0 &&
            <div className="field-container">
              {fields.map(field => (
                <div key={field.id}>
                  <p className='filled-label'>{field.label}</p>
                  <p>{field.text_body}</p>
                </div>
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
}
