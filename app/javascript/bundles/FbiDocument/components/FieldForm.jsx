import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LabelAutocomplete from './LabelAutocomplete';
import SerialNumberModal from './SerialNumberModal';
import { Controller } from 'react-hook-form';

import RedactionEditor from './RedactionEditor';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));


export default function FieldForm(props) {
  const {
    pageCount,
    digitalDocument,
    saveField,
    existingFields,
    clearFields,
    pageSerialNumber,
    setPageSerialNumber,
    labelValue,
    setLabelValue,
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    pageNumber,
    setPageNumber,
    setModalSerialOpen,
    modalSerialOpen,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))

  const [textBody, setTextBody] = useState('');

  function handleChange(div) {
    const newDiv = div.cloneNode(true);

    const codeSpans = newDiv.querySelectorAll('span');
    codeSpans.forEach(span => {
      const code = span.textContent;
      const size = computeSize(span);
      const id = uuidv4();
      const codeText = `///REDACTION: ${code} || SIZE: ${size} || UUID: ${id}///`;
      span.replaceWith(new Text("got a code: " + codeText));
    });

    setTextBody(newDiv.textContent);
  }

  function openNewPage(pageSerialNumber) {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setPageSerialNumber(pageSerialNumber)
    clearFields();
  }

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    saveField({
      ...formData,
      label: labelValue.label,
      page_number: pageNumber,
      pageSerialNumber: pageSerialNumber,
      text_body: textBody,
    }, ev);
    setLabelValue("");
    setTextBody("");
    reset();
    setValue("serialNumber", serialNumber);
  }

  const showFields = () => {
    return (
      <>
        <RedactionEditor onChange={setTextBody} />
        <div className='btn save-field'>
        </div>
      </>
    );
  }

  console.log(textBody);
  return (
    <>
      <div className="field-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-controls">

            <Controller
              name="fieldLabel"
              control={control}
              render={props => (
                <LabelAutocomplete
                  existingLabels={existingLabels}
                  value={labelValue}
                  setValue={setLabelValue} />
              )} />
            <Button
              disabled={textBody.length < 1}
              variant="contained"
              type="submit"
              value="Save">
              Save Field
        </Button>
          </div>

          <br /><br />
          {labelValue && labelValue.label.length > 0 && showFields()}
        </form>
        <br />
        <br />
        <br />
        <SerialNumberModal
          open={modalSerialOpen}
          handleClose={() => setModalSerialOpen(false)}
          onSubmit={({ pageSerialNumber }) => {
            setPageSerialNumber(pageSerialNumber)
            openNewPage(pageSerialNumber)
            setModalSerialOpen(false)
          }} />
      </div>
    </>
  );
}
