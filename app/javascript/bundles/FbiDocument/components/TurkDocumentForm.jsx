import React, { useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';
import { useForm, Controller } from 'react-hook-form';
import DigitalDocumentForm from './DigitalDocumentForm';
import FieldRow from './FieldRow';
import InstructionInfo from './InstructionInfo';
import SubmitModal from './SubmitModal';
import SerialNumberModal from './SerialNumberModal';
import Button from '@material-ui/core/Button';
import Help from '@material-ui/icons/Help';
import { v4 as uuidv4 } from 'uuid';

export default function TurkDocumentForm(props) {
  const { docId, pageCount, existingFields, docUrl } = props;
  const [digitalDocument, setDocument] = useState(null);
  const [fields, setFields] = useState([]);
  const [startSerialNumber, setStartSerialNumber] = useState('')
  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalSerialOpen, setModalSerialOpen] = useState(false);
  const [submitModalOpen, setSubmitModelOpen] = useState(false)
  const [textBody, setTextBody] = useState('');
  const [ isEditing, setIsEditing ] = useState(false);

  console.log('text body: ', textBody);
  const {
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
    const token =
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postBody = extractPostBody(field);

    try {
      const resp = await axios.post(`/turk_documents/${digitalDocument.id}/fields`, postBody);
      setFields([...fields, resp.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setLabelValue("");
      setTextBody("");
      reset();
      console.log('done submitting field');
    }
  }

  function extractPostBody(field) {

    const raw_html = field.text_body.innerHTML;
    const parsed_body = parseTextBody(field.text_body);
    const { field_label, text_body, ...postData } = field;

    const postBody = {
      ...postData,
      raw_html,
      parsed_body,
    }

    return postBody;
  }

  async function updateField(field, fieldId) {
    const token =
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postBody = extractPostBody(field);

    try {
      const resp = await axios.put(
        `/turk_documents/${digitalDocument.id}/fields/${fieldId}`,
        postBody);
      setFields([...fields, resp.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsEditing(false);
      setLabelValue("");
      setTextBody("");
      reset();
      console.log('done submitting field');
    }
  }


  function clearFields() {
    setFields([]);
  }

  const hasFields = fields.length > 0;

  const renderForm = () => (
    <FieldForm
      control={control}
      handleSubmit={handleSubmit}
      setValue={setValue}
      reset={reset}
      labelValue={labelValue}
      setLabelValue={setLabelValue}
      existingFields={existingFields}
      saveField={saveField}
      setPageSerialNumber={setStartSerialNumber}
      pageNumber={pageNumber}
      textBody={textBody}
      setTextBody={setTextBody}
    />
  );

  function openNewPage(pageSerialNumber) {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setStartSerialNumber(pageSerialNumber)
    setIsEditing(false);
    clearFields();
  }
  return (
    <div>
      <div className='page-header'>
        <a href='/help' className='a help'><Help fontSize="large" ></Help></a>
      </div>
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
              <InstructionInfo
                docUrl={docUrl}
                digitalDocument={digitalDocument}
                startSerialNumber={startSerialNumber}
                pageNumber={pageNumber}
                pageCount={pageCount} />

              {(pageNumber == pageCount) ?

                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setSubmitModelOpen(true)}>SUBMIT</Button>

                :
                <Button
                  variant="contained"
                  disabled={!hasFields}
                  onClick={() => setModalSerialOpen(true)}
                > + Add New Page</Button>
              }
            </div>

            <SubmitModal
              open={submitModalOpen}
              handleClose={() => setSubmitModelOpen(false)}
              docId={docId}
            />
            <div className='adding-field'>
              <div className="field-container">
                {fields.map(field => (
                  <FieldRow key={field.id}
                    control={control}
                    handleSubmit={handleSubmit}
                    setValue={setValue}
                    reset={reset}
                    labelValue={labelValue}
                    setLabelValue={setLabelValue}
                    existingFields={existingFields}
                    saveField={updateField}
                    setStartSerialNumber={setStartSerialNumber}
                    pageNumber={pageNumber}
                    textBody={textBody}
                    setTextBody={setTextBody}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    field={field} />
                ))}
                {!isEditing && renderForm()}
                <SerialNumberModal
                  open={modalSerialOpen}
                  handleClose={() => setModalSerialOpen(false)}
                  onSubmit={({ pageSerialNumber }) => {
                    setStartSerialNumber(pageSerialNumber)
                    openNewPage(pageSerialNumber)
                    setModalSerialOpen(false)
                  }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
