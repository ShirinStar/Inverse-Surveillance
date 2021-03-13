import React from 'react';
import FieldForm from './FieldForm';
import { connect } from 'react-redux';

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

  return (
    <div onClick={() => {
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
      setIsEditing(true)}}>
      {isEditing && fieldEdit && fieldEdit.id === field.id ? (
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
          setTextBody={setTextBody} /> )
      : (
        <>
          <p className='filled-label'>{label}</p>
          <p className='filled-text' dangerouslySetInnerHTML={{ __html: rawHtml  }}></p>
        </>
      )}
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
