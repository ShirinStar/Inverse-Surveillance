import React from 'react';
import FieldForm from './FieldForm';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import lodash from 'lodash';

function FieldRow(props) {
  const { label, raw_html: rawHtml } = props.field;
  const {
    isEditing,
    setIsEditing,
    saveField,
    updateField,
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
    setStartSerialNumber,
    field,
    fieldEdit,
    cancel,
  } = props;

  function handleBeginEdit() {
    // ignore if already editing this doc
    if (fieldEdit && field && (fieldEdit.id === field.id)) {
      return;
    }
    setLabelValue({label: field.label});
    setTextBody(field.raw_html);
    props.beginUpdate({
      id: field.id,
      textBody: field.raw_html,
      textLabel: field.label,
    });
    setIsEditing(true)
  }

  function renderEditButton() {
    return (
      <div className='btn-edit'>
        <Button
          color="primary"
          onClick={ () => {
            if (fieldEdit && field && (fieldEdit.id === field.id)) {
              return;
            }
            setLabelValue({label: field.label});
            setTextBody(field.raw_html);
            props.beginUpdate({
              id: field.id,
              textBody: field.raw_html,
              textLabel: field.label,
            });
            setIsEditing(true)}}><Edit>Edit Field</Edit></Button>
      </div>
    );
  }

  function renderFieldForm() {
    return (
      <FieldForm
        cancel={cancel}
        control={control}
        updateField={updateField}
        handleSubmit={handleSubmit}
        setValue={setValue}
        reset={reset}
        labelValue={labelValue}
        setLabelValue={setLabelValue}
        existingFields={existingFields}
        saveField={(formData) => {
          saveField(formData, props.field.id)
        }}
        setPageSerialNumber={setStartSerialNumber}
        pageNumber={pageNumber}
        textBody={textBody}
        isEditing={isEditing}
        setTextBody={setTextBody} />
    )
  }

  function renderTableRow() {
    const { table_fields } = field;
    const inputs = _.sortBy(
      _.groupBy(table_fields, (row) => row.row_idx),
      (row) => row.row_idx);
    return (
      <>
      <div>table rows</div>
        <table>
          <thead>
            <tr>
              {inputs.length > 0 && _.sortBy(inputs[0], (input) => input.col_idx).map((input, idx) => (
            <th key={idx}>{input.value}</th>
          ))}
            </tr>
          </thead>
          <tbody>
            {inputs.slice(1).map((row, rowIdx) => (
              <tr key={rowIdx}>
                {_.sortBy(row, (el) => el.col_idx).map(col => (
                  <td className={col.is_redacted ? "redacted" : ""} key={col.id}>{col.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  function renderInputRow() {
    return (
      <>
        {renderEditButton()}
        {isEditing && fieldEdit && fieldEdit.id === field.id ? (
          renderFieldForm())
          : (
            <>
              <p className='filled-label'>{label}</p>
              <p className='filled-text' dangerouslySetInnerHTML={{ __html: rawHtml  }}></p>
            </>
          )}
      </>
    )
  }

  return (
    <div className='close-editor' onClick={handleBeginEdit}>
      { field.field_type == 'INPUT' ? renderInputRow() : renderTableRow() }
        
    </div>
  );
}

const beginUpdate = ({id, textBody, textLabel}) => ({
  type: 'BEGIN_UPDATE',
  payload: {
    id,
    textBody,
    textLabel,
  },
});

export default connect((state) => {
  return {
    fieldEdit: state.main.fieldEdit,
  };
}, { beginUpdate })(FieldRow);
