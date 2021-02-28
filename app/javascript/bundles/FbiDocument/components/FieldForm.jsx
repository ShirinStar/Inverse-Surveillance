import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

function LabelAutocomplete(props) {
  const { 
    value,
    setValue,
    existingLabels,
  } = props;
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            label: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            label: newValue.inputValue
          });
        } else {
          console.log(newValue);
          setValue(newValue);
        }
      }}

      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            label: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="label-autocomplete"
      options={
        [
          ...existingLabels,
          {
            label: "Synopsis",
              id: 2,
          },
          {
            label: "Date",
            id: 1,
          },
          {
            label: "Summary",
            id: 2,
          },
        ]
      }
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.label;
      }}
      renderOption={(option) => option.label}
      freesolo="true"
      renderInput={(params) => (
        <TextField { ...params } label="Field Label" variant="outlined" />
      )}
    />
  )
}

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
