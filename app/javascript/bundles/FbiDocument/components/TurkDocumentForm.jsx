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
import { convertToInputs } from './table';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import HelpModal from './HelpModal';
import _ from 'lodash';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
  const parsedFields = oldFields === null ? [] : JSON.parse(oldFields).map(field => {
    if (field.field_type === 'INPUT') {
      return field;
    } else if (field.field_type === 'TABLE') {
      const parsedTableFields = field.table_fields.map(tableField => ({
        ...tableField,
        isRedacted: tableField.is_redacted,
      }));
      const tableField = {
        ...field,
        table_fields: parsedTableFields,
      };

      return tableField;
    }
  })
  console.log('parsed fields: ', parsedFields);
  const [fields, setFields] = useState(parsedFields || []);

  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalSerialOpen, setModalSerialOpen] = useState(false);
  const [submitModalOpen, setSubmitModelOpen] = useState(false)
  const [textBody, setTextBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showHelpModal, setHelpModal] = useState(false);


  // determine current serial number
  const currentPageFields = fields.filter(field => field.page_number === pageNumber)

  const currentSerialNumber = currentPageFields.length > 0 ? currentPageFields[currentPageFields.length - 1].serial_number : (
    digitalDocument === null ? '' : digitalDocument.start_serial_number);
  const [startSerialNumber, setStartSerialNumber] = useState(currentSerialNumber)

  // table editor state
  const [numColumns, setNumColumns] = useState(0);
  const [inputRows, setInputRows] = useState([]);
  const [rowCounter, setRowCounter] = useState(0);

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
      setLabelValue(null);
    }

  }

  function resetTableEditor() {
    setInputRows([]);
    setIsEditing(false);
    reset();
    setNumColumns(0);
    resetStore();
  }
  function resetEditor() {
    setLabelValue(null);
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
    }
  }

  async function updateTableField(tableData) {
    setToken();
    const { fieldId } = tableData;
    try {
      const inputRowsDto = inputRows.map(row => ({
        ...row,
        inputs: row.inputs.map(input => ({
          ...input,
          is_redacted: input.isRedacted,
        }))
      }));
      const postBody = {
        inputRows: inputRowsDto,
        msg: 'hey there'
      };
      const resp = await axios.put(
        `/table_fields/${fieldId}`,
        postBody
      );
      const newFields = fields.map(field => (
        (field.id === fieldId) ? (
          {
            ...field,
            table_fields: resp.data.map(tableField => ({
              ...tableField,
              isRedacted: tableField.is_redacted,
            })),
          }) : field));
      setFields(newFields);
      setInputRows([]);
      setIsEditing(false);
      reset();
      setNumColumns(0);
      finishEdit();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSaveTableField(postData) {
    setToken();

    try {
      const resp = await axios.post(
        `/table_fields`, {
        digital_document_id: digitalDocument.id,
        table_fields: postData.tableData,
        page_number: postData.page_number,
        serial_number: startSerialNumber,
      }
      );
      const parsedTableFields = resp.data.table_fields.map(tableField => ({
        ...tableField,
        isRedacted: tableField.is_redacted,
      }));

      const newTableField = {
        ...resp.data,
        table_fields: parsedTableFields,
      };
      setFields([...fields, newTableField]);
      setInputRows([]);
      setIsEditing(false);
      setNumColumns(0);
      reset();
    } catch (e) {
      console.log(e);
    }
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
      numColumns={numColumns}
      setNumColumns={setNumColumns}
      inputRows={inputRows}
      setInputRows={setInputRows}
      rowCounter={rowCounter}
      setRowCounter={setRowCounter}
      documentCategory={docCat}
    />
  );

  function openNewPage(pageSerialNumber) {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setStartSerialNumber(pageSerialNumber)
    setIsEditing(false);
  }

  const hasNextPage = _.some(fields, field => field.page_number > pageNumber);
  const hasPrevPage = pageNumber > 1;

  function refreshSerialNumber(newPageNumber) {
    const newPageField = fields.find(field => field.page_number === newPageNumber);
    setStartSerialNumber(newPageField.serial_number);
  }

  function renderPageNavButtons() {
    console.log('fields: ', fields);
    console.log('render page nav ' + pageNumber + ' ' + pageCount + ' ' + hasPrevPage)
    return (
      <>
      </>
    );
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

              {renderPageNavButtons()}

            </div>

            <SubmitModal
              open={submitModalOpen}
              handleClose={() => setSubmitModelOpen(false)}
              docId={docId}
            />
            <div className='adding-field'>
              <div className="field-container">

                <div className='titlepageheader'>
                  <div className='dotDiv'>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <h1 className='fbiPageTitle'>FEDERAL BUREAU OF INVESTIGATION</h1>
                </div>
                {_.sortBy(fields, field => new Date(field.created_at))
                  .filter(field => field.page_number === pageNumber)
                  .map(field => (
                    <FieldRow key={field.id}
                      handleTableUpdate={updateTableField}
                      cancel={resetEditor}
                      cancelTableUpdate={resetTableEditor}
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
                      numColumns={numColumns}
                      setNumColumns={setNumColumns}
                      inputRows={inputRows}
                      setInputRows={setInputRows}
                      rowCounter={rowCounter}
                      setRowCounter={setRowCounter}
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
              <div className='divPages'>
                <div className='backPage'>
                  {hasPrevPage && (
                    <Button
                      color="primary"
                      onClick={() => {
                        setPageNumber(pageNumber - 1)
                        refreshSerialNumber(pageNumber - 1);
                      }}><ArrowBackIosIcon size="small" color="primary"></ArrowBackIosIcon>
                      <br /><span className='pageArrow'>page {pageNumber - 1}</span></Button>
                  )}
                </div>
                <div className='addNewPage'>
                  <div className='addNewPageInner'>
                    {!hasNextPage && (pageNumber !== pageCount) && (
                      <Button
                        variant="contained"
                        disabled={!hasFields}
                        onClick={() => setModalSerialOpen(true)}
                      > + Add New Page</Button>
                    )}
                  </div>
                </div>
                <div className='nextPage'>
                  {hasNextPage && (
                    <Button
                      color="primary"
                      onClick={() => {
                        setPageNumber(pageNumber + 1)
                        refreshSerialNumber(pageNumber + 1);
                      }}><span className='pageArrow'>page {pageNumber + 1}</span><ArrowForwardIosIcon size="small" color="primary"></ArrowForwardIosIcon>
                      <br /></Button>)
                  }
                </div>
                
              </div>
              {pageNumber === pageCount && (
                <Button
                  variant="contained"
                  color="secondary"
                  size='large'
                  type="submit"
                  onClick={() => setSubmitModelOpen(true)}>SUBMIT</Button>
              )}
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
