import React from 'react';
import FieldForm from './FieldForm';

export default function FieldRow(props) {
  const { label, raw_html: rawHtml } = props.field;
  const {
    isEditing,
    setIsEditing,
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
    setStartSerialNumber,
    field,
  } = props;

  return (
    <div onClick={() => {
      setLabelValue({label: field.label});
      setTextBody(field.raw_html);
      setIsEditing(true)}}>
      {isEditing ? (
        <FieldForm
          control={control}
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
