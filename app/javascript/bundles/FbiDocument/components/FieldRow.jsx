import React from 'react';
import FieldForm from './FieldForm';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import TableRow from './TableRow';
import TableEditor from './TableEditor';
import lodash from 'lodash';
import { convertToInputs } from './table';

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
    handleTableUpdate,
    reset,
    control,
    setValue,
    pageNumber,
    setTextBody,
    fieldEdit,
    textBody,
    setStartSerialNumber,
    field,
    cancel,
    numColumns,
    setNumColumns,
    inputRows,
    setInputRows,
    rowCounter,
    setRowCounter,
    updateTableField,
  } = props;

  function handleBeginEdit() {
    // ignore if already editing this doc
    if (fieldEdit && field && (fieldEdit.id === field.id)) {
      return;
    }

    const fieldType = field.field_type;

    if (field.field_type === 'INPUT') {

      setLabelValue({label: field.label});
      setTextBody(field.raw_html);
      const fieldType = field.field_type;
      const tableFields = field.table_fields;
      props.beginUpdate({
        field,
        id: field.id,
        fieldType,
        tableFields,
        textBody: field.raw_html,
        textLabel: field.label,
      });
    } else {
      const inputFields = convertToInputs(field.table_fields);
      setInputRows(inputFields);
      const columnNum = (inputFields.length > 0 && inputFields[0].inputs.length > 0) ? inputFields[0].inputs.length : 0;
      setNumColumns(columnNum);
      setRowCounter(inputFields.length - 1);
      
      props.beginUpdate({
        field: {
          ...field,
          inputFields,
        },
        id: field.id,
        fieldType,
        inputFields,
      })
    }
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
              field,
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
        fieldType={!!field ? field.field_type : null }
        setTextBody={setTextBody} />
    )
  }

  function renderTableRow() {
    if (isEditing && fieldEdit.id === field.id) {
      return (
        <TableEditor
          handleUpdate={handleTableUpdate}
          numColumns={numColumns}
          setNumColumns={setNumColumns}
          inputRows={inputRows}
          setInputRows={setInputRows}
          rowCounter={rowCounter}
          setRowCounter={setRowCounter}
          saveTableField={updateTableField}
          isEditing={isEditing}
          fieldEdit={fieldEdit}
          setEditorView={null} />
      );
    } else {
      return (<TableRow 
        fieldEdit={fieldEdit}
        isEditing={isEditing}
        field={field} 
      /> 
      );
    }
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

const beginUpdate = ({id, field, textBody, textLabel, fieldType, tableFields}) => ({
  type: 'BEGIN_UPDATE',
  payload: {
    id,
    field,
    fieldType,
    tableFields,
    textBody,
    textLabel,
  },
});

export default connect((state) => {
  return {
    fieldEdit: state.main.fieldEdit,
  };
}, { beginUpdate })(FieldRow);
