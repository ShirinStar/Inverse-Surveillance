import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'

import LabelAutocomplete from './LabelAutocomplete';

export default function FieldForm(props) {
  const {
    pageCount,
    digitalDocument,
    saveField,
    existingFields,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))
  const { register, handleSubmit, reset, control } = useForm();
  const [ value, setValue ] = useState(null);

  function onSubmit(val, ev) {
    saveField({...val, label: value.label}, ev);
    reset();
  }

  return (
    <>
      <h2>Field Form</h2>
      <h3>Document Date: {digitalDocument.document_date}</h3>
      <h4>Page Count: {pageCount}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="label">Label</label><br />
        <Controller
          name="fieldLabel"
          control={control}
          render={props => (
            <LabelAutocomplete 
              existingLabels={existingLabels}
            value={value}
            setValue={setValue }/>
          )} />
        <br /><br />
        <label htmlFor="text-body">TextBody</label><br />
        <input required
          id="text-body"
          name="text_body"
          ref={register} />

        <input type="submit" />
      </form>
    </>

  );
}
