import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import _ from 'lodash';

const filter = createFilterOptions();

export default function LabelAutocomplete(props) {
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
        if (params.inputValue !== '' && !_.find(filtered, (label) => label.label === params.inputValue)) {
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
            id: 3,
          },
          {
            label: "Main-Section",
            id: 4,
          },
          {
            label: "Details",
            id: 5,
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
        <TextField { ...params } label="Type or choose a label" variant="outlined" />
      )}
    />
  )
}

