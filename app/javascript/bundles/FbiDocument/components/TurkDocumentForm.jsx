import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';
import { useForm, Controller } from 'react-hook-form';
import DigitalDocumentForm from './DigitalDocumentForm';
import Button from '@material-ui/core/Button';

export default function TurkDocumentForm(props) {
  const { docId, pageCount, existingFields } = props;
  const [digitalDocument, setDocument] = useState(null);
  const [fields, setFields] = useState([]);
  const [startSerialNumber, setStartSerialNumber] = useState('')
  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalSerialOpen, setModalSerialOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm();

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

  const hasFields = fields.length > 0;
  console.log('label value: ', labelValue);
  const renderForm = () => (
    <FieldForm
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      setValue={setValue}
      reset={reset}
      labelValue={labelValue}
      setLabelValue={setLabelValue}
      pageCount={pageCount}
      existingFields={existingFields}
      saveField={saveField}
      digitalDocument={digitalDocument}
      clearFields={clearFields}
      docUrl={props.docUrl}
      pageSerialNumber={startSerialNumber}
      setPageSerialNumber={setStartSerialNumber}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      setModalSerialOpen={setModalSerialOpen}
      modalSerialOpen={modalSerialOpen}
    />
  )
  return (
    <div>
      <div className="form-doc-container">
          {digitalDocument === null ? (
        <div className="form-container">
            <DigitalDocumentForm
              onSubmit={initialSubmit} 
              docUrl={props.docUrl}/>
        </div>
          ) : (
            <>
      <div className='document-head-section'>
        <div className='document-titles'>
        <h2>Document Form</h2>
        <p >
          <a className='orginal-link' target="_blank" href={props.docUrl}>Link of the Original Document</a>
        </p>
        </div>

        <div className='document-info'>
        <p><strong>Document Date:</strong> {digitalDocument.document_date}</p>
        <p><strong>Page Serial Number:</strong> {startSerialNumber}</p>
        <p><strong>Current page:</strong> {pageNumber} / {pageCount - pageNumber + 1}</p>
        </div>
        <Button
          variant="contained"
          disabled={!hasFields}
          onClick={() => setModalSerialOpen(true)}
        > + Add New Page</Button> 
      </div>

              <div className='adding-field'>
                <div className="field-container">
                  {fields.map(field => (
                    <div key={field.id}>
                      <p className='filled-label'>{field.label}</p>
                      <p>{field.text_body}</p>
                    </div>
                  ))}
                  { renderForm() }
                </div>
              </div>
            </>
          )}
        </div>
    </div>
  );
}
