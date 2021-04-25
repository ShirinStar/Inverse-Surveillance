import React from 'react';
import { Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import LabelAutocomplete from './LabelAutocomplete';
import RedactionEditor from './RedactionEditor';
import { TABLE_DOCUMENT_CATEGORY } from '../util/categories';

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
    setTableView,
    documentCategory,
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
        <div className='section-edit'>
          <div>
          {isEditing &&
              <Button
                color='secondary'
                variant="contained"
                size='small'
                onClick={cancel}
                value="Cancel">
                Undo Changes
            </Button>
          }
          {labelValue === null && documentCategory === TABLE_DOCUMENT_CATEGORY ? (
            <Button
              variant="contained"
              size="medium"
              onClick={() => setTableView()}>Click to Add Table</Button>
          ) : (

            <>
            { labelValue !== null && (

            <Button
              variant="contained"
              disabled={labelValue === null}
              size='small'
              type="submit"
              value="Save">
              Save Field
            </Button>
            )}
            </>
          )}
        </div>
        </div>
      </div>
      <br /><br />
      {labelValue && labelValue.label.length > 0 && (
        <RedactionEditor onChange={setTextBody} />
      )}
    </>
  );
}
