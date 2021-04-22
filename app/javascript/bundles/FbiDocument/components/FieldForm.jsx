import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TableEditor from './TableEditor';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));


function FieldForm(props) {
  const {
    saveField,
    updateField,
    existingFields,
    pageSerialNumber,
    labelValue,
    setLabelValue,
    handleSubmit,
    control,
    setValue,
    pageNumber,
    setTextBody,
    textBody,
    fieldEdit,
    fieldType,
    isEditing,
    cancel,
    handleSaveTableField,
    numColumns,
    setNumColumns,
    inputRows,
    setInputRows,
    rowCounter,
    setRowCounter,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))
  const [tableView, setTableView] = useState(true);

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    if (!!fieldEdit) {
      updateField(fieldEdit.id, {
        ...formData,
        label: labelValue.label,
        page_number: pageNumber,
        pageSerialNumber: pageSerialNumber,
        text_body: textBody,
      });

    } else {

      saveField({
        ...formData,
        label: labelValue.label,
        page_number: pageNumber,
        pageSerialNumber: pageSerialNumber,
        text_body: textBody,
      }, ev);
    }
    setValue("serialNumber", serialNumber);
  }


  function saveTableField(tableData) {
    const tableFields = tableData.map(row => ({
      ...row,
      inputs: row.inputs.map(input => ({
        ...input,
        is_redacted: input.isRedacted,
      }))
    }));

    handleSaveTableField({
      tableData: tableFields,
      page_number: pageNumber,
      serial_number: pageSerialNumber,
    })
  }

  function computeShouldRenderTable() {
    return !isEditing || fieldType === 'TABLE'; 
  }

  return (
    <>
      <div className="field-form-container">
        {computeShouldRenderTable() ? (
          <TableEditor
            numColumns={numColumns}
            setNumColumns={setNumColumns}
            inputRows={inputRows}
            setInputRows={setInputRows}
            rowCounter={rowCounter}
            setRowCounter={setRowCounter}
            saveTableField={saveTableField}
            setEditorView={() => setTableView(false)}
          />
        ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Editor
              setTableView={() => setTableView(true)}
              cancel={cancel}
              isEditing={isEditing}
              control={control}
              existingLabels={existingLabels}
              labelValue={labelValue}
              setLabelValue={setLabelValue}
              setTextBody={setTextBody}
              textBody={textBody} />
        </form>
        )}
      </div>
    </>
  );
}

export default connect((state) => ({
  fieldEdit: state.main.fieldEdit,
}), null)(FieldForm);
