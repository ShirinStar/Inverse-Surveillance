import React from 'react';
import { Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import LabelAutocomplete from './LabelAutocomplete';
import RedactionEditor from './RedactionEditor';

export default function Editor(props) {
  const {
    control,
    existingLabels,
    labelValue,
    setLabelValue,
    textBody,
    setTextBody,
    cancel,
    isEditing,
  } = props;

  return (
    
    <>
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
        {isEditing &&
        <Button
          variant="contained"
          onClick={cancel}
          value="Cancel">
          Undo Changes
        </Button>
        }
        <Button
          disabled={textBody.length < 1}
          variant="contained"
          type="submit"
          value="Save">
          Save Field
        </Button>
      </div>
      <br /><br />
      {labelValue && labelValue.label.length > 0 && (
        <RedactionEditor onChange={setTextBody} />
      )}
    </>
  );
}