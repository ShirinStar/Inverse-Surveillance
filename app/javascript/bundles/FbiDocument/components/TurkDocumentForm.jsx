import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';
import { useForm, Controller } from 'react-hook-form';
import DigitalDocumentForm from './DigitalDocumentForm';
import SubmitModal from './SubmitModal';
import Button from '@material-ui/core/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import markedSample from 'images/markedSample.png';
import markedFields from 'images/markedFields.jpg';
import markedRedCode from 'images/markedRedCode.png';
import { v4 as uuidv4 } from 'uuid';

export default function TurkDocumentForm(props) {
  const { docId, pageCount, existingFields, modalSubmitOpen } = props;
  const [digitalDocument, setDocument] = useState(null);
  const [fields, setFields] = useState([]);
  const [startSerialNumber, setStartSerialNumber] = useState('')
  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalSerialOpen, setModalSerialOpen] = useState(false);
  const [SubmitModal, setSubmitModel] = useState(false)

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


  function computeSize(span) {
    if (span.classList.contains('small-redaction')) {
      return "SMALL";
    } else if (span.classList.contains('word-redaction')) {
      return "WORD";
    } else if (span.classList.contains('medium-redaction')) {
      return "MEDIUM";
    } else if (span.classList.contains("large-redaction")) {
      return "LARGE";
    } else {
      throw new Error("invalid redaction size or not provided");
    }
  }

  function parseTextBody(div) {
    const newDiv = div.cloneNode(true);

    const codeSpans = newDiv.querySelectorAll('span');
    codeSpans.forEach(span => {
      const code = span.textContent;
      const size = computeSize(span);
      const id = uuidv4();
      const codeText = `///REDACTION: ${code} || SIZE: ${size} || UUID: ${id}///`;
      span.replaceWith(new Text("got a code: " + codeText));
    });

    return newDiv.textContent;
  }

  async function saveField(field) {
    console.log(field);
    const token =
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const raw_html = field.text_body.innerHTML;
    const parsed_body = parseTextBody(field.text_body);
    const { field_label, text_body, ...postData } = field;

    const postBody = {
      ...postData,
      raw_html,
      parsed_body,
    }
    try {
      const resp = await axios.post(`/turk_documents/${digitalDocument.id}/fields`, postBody);
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
              docUrl={props.docUrl} />
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
                <p><strong>Current page:</strong> {pageNumber} / {pageCount}</p>
              </div>

              <div className='document-instruction-div'>
                <p className='document-instruction'>How to start? <br />
                1• Please select a section title
                <Tooltip title={
                    <React.Fragment>
                      <img className='hover-image instruction' src={markedSample} />
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip>
                  <br />
                2• Then, fill the text field below
                <Tooltip title={
                    <React.Fragment>
                      <img className='hover-image instruction' src={markedFields} />
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip> <br />
                3• When there is a redaction, fill the code when asked
                <Tooltip title={
                    <React.Fragment>
                      <img className='hover-image instruction' src={markedRedCode} />
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip> <br />
                4• Do that to all the original document's field you received. <br /><br />
                For further help <a className='link-instruction' href='/'>click here </a>.
                 </p>
              </div>
              {(pageNumber == 1) ?
                <form action="/turk_documents/complete" method="POST">
                  <input type="hidden" name="authenticity_token" value={document.querySelector('[name=csrf-token]').content} />
                  <input type="hidden" name="doc_id" value={docId} />
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => setSubmitModel(true)}>SUBMIT</Button>
                </form>
                :
                <Button
                  variant="contained"
                  disabled={!hasFields}
                  onClick={() => setModalSerialOpen(true)}
                > + Add New Page</Button>
              }
            </div>

            <div className='adding-field'>
              <div className="field-container">
                {fields.map(field => (
                  <div key={field.id}>
                    <p className='filled-label'>{field.label}</p>
                    <p className='filled-text' dangerouslySetInnerHTML={{ __html: field.raw_html }}></p>
                  </div>
                ))}
                {renderForm()}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
