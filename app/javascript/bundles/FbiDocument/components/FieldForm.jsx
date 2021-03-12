import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';

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
    saveField,
    existingFields,
    pageSerialNumber,
    labelValue,
    setLabelValue,
    handleSubmit,
    reset,
    control,
    setValue,
    pageNumber,
    setTextBody,
    textBody,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    saveField({
      ...formData,
      label: labelValue.label,
      page_number: pageNumber,
      pageSerialNumber: pageSerialNumber,
      text_body: textBody,
    }, ev);
    setValue("serialNumber", serialNumber);
  }

  return (
    <>
      <div className="field-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Editor
              control={control}
              existingLabels={existingLabels}
              labelValue={labelValue}
              setLabelValue={setLabelValue}
              setTextBody={setTextBody}
              textBody={textBody} />
        </form>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
