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
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import HelpModal from './HelpModal';
import _ from 'lodash';

function setToken() {
  const token =
    document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token
}

function TurkDocumentForm(props) {
  const {
    docId,
    pageCount,
    finishEdit,
    existingFields,
    docUrl,
    digitalDoc,
    oldFields,
    resetStore,
    docCat
  } = props;

  const [digitalDocument, setDocument] = useState(JSON.parse(digitalDoc));
  const [fields, setFields] = useState(JSON.parse(oldFields) || []);

  const currentSerialNumber = fields.length > 0 ? fields[fields.length - 1].serial_number : ''
  const [startSerialNumber, setStartSerialNumber] = useState(currentSerialNumber)
  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalSerialOpen, setModalSerialOpen] = useState(false);
  const [submitModalOpen, setSubmitModelOpen] = useState(false)
  const [textBody, setTextBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showHelpModal, setHelpModal] = useState(false);
  console.log(currentSerialNumber);

  console.log('serial number: ', startSerialNumber);
  console.log('text body: ', textBody);
  const {
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm();

  async function initialSubmit(formData) {
    debugger
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

  async function updateField(id, field) {
    const token =
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postBody = extractPostBody(field);

    try {
      const resp = await axios.put(`/turk_documents/${digitalDocument.id}/fields`, postBody);
      setFields(fields.map(field => {
        return field.id === id ? resp.data : field;
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setLabelValue("");
      resetStore();
      setTextBody("");
      reset();
      console.log('done submitting field');
    }

  }

  function resetEditor() {
    setLabelValue("");
    setTextBody("");
    reset();
    setIsEditing(false);
    resetStore();
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
      resetEditor();
      console.log('done submitting field');
    }
  }

  function extractPostBody(field) {
    const raw_html = field.text_body.innerHTML;
    const parsed_body = parseTextBody(field.text_body);
    const { field_label, text_body, ...postData } = field;
    console.log('serial number: ', startSerialNumber)

    const postBody = {
      ...postData,
      raw_html,
      parsed_body,
    }

    return postBody;
  }

  async function updateField(fieldId, field) {
    const token =
      document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postBody = extractPostBody(field);

    try {
      const resp = await axios.put(
        `/turk_documents/${digitalDocument.id}/fields/${fieldId}`,
        postBody);
      setFields(fields.map(field => (
        field.id === fieldId ? resp.data : field
      )));
    } catch (e) {
      console.log(e);
    } finally {
      setIsEditing(false);
      setLabelValue("");
      setTextBody("");
      reset();
      finishEdit();
      console.log('done submitting field');
    }
  }


  async function handleSaveTableField(postData) {
    setToken();

    try {
      const resp = await axios.post(
        `/table_fields`, {
          digital_document_id: docId,
          table_fields: postData.tableData,
          page_number: postData.page_number,
          serial_number: startSerialNumber,
        } 
      );
    } catch (e) {
      console.log(e);
    }
  }

  function clearFields() {
    setFields([]);
  }

  const hasFields = fields.length > 0;

  const renderForm = () => (
    <FieldForm
      cancel={resetEditor}
      control={control}
      handleSubmit={handleSubmit}
      setValue={setValue}
      reset={reset}
      pageSerialNumber={startSerialNumber}
      labelValue={labelValue}
      setLabelValue={setLabelValue}
      existingFields={existingFields}
      saveField={saveField}
      pageNumber={pageNumber}
      textBody={textBody}
      setTextBody={setTextBody}
      handleSaveTableField={handleSaveTableField}
    />
  );

  function openNewPage(pageSerialNumber) {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setStartSerialNumber(pageSerialNumber)
    setIsEditing(false);
    clearFields();
    console.log('yay');
  }

  return (
    <div>
      <div className='page-header'>
        <HelpModal />
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
                docCat={docCat}
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
                {_.sortBy(fields, field => new Date(field.created_at)).map(field => (
                  <FieldRow key={field.id}
                    cancel={resetEditor}
                    updateField={updateField}
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

export default connect(
  (state) => {
    return { foo: state.main.foo }
  },
  {
    doFoo: (data) => ({ type: "FOO", payload: "fooby" }),
    finishEdit: () => ({ type: "FINISH_EDIT", payload: {} }),
    resetStore: () => ({ type: 'RESET', payload: {} })
  })
  (TurkDocumentForm);
