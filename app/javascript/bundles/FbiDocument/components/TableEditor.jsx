import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import TableRowInputs from './TableRowInputs';

function TableView(props) {
  const {
    setEditorView,
    saveTableField,
    numColumns,
    setNumColumns,
    inputRows,
    setInputRows,
    rowCounter,
    setRowCounter,
    fieldEdit,
    isEditing,
    handleUpdate,
    cancel
  } = props;

  function updateInputs(num) {
    setRowCounter(0);
    const row = { id: 0, inputs: [], };

    for (let i = 0; i < num; i++) {
      row.inputs.push({key: i, value: '', isRedacted: false});
    }

    setInputRows([row]);
  }

  function handleRowChange(rowId, inputIdx, value) {
    const row = inputRows.find(el => el.id === rowId);
    const rowIdx = inputRows.indexOf(row);
    const input = row.inputs[inputIdx];
    const inputs = row.inputs.slice(0, inputIdx).concat([{...input, value}]).concat(row.inputs.slice(inputIdx +1));
    setInputRows(inputRows.slice(0, rowIdx).concat([{...row, inputs}]).concat(inputRows.slice(rowIdx + 1)));
  }

  function addRow() {
    const newRowCount = rowCounter + 1;
    setRowCounter(newRowCount);
    const rowId = newRowCount;
    const row = { id: rowId, inputs: [], };

    for (let i = 0; i < numColumns; i++) {
      row.inputs.push({key: i, value: '', isRedacted: false});
    }
    const newRows = inputRows.concat([row]);

    setInputRows(newRows);
  }

  function markRedacted(rowId, inputIdx, isRedacted) {
    const row = inputRows.find(el => el.id === rowId);
    const rowIdx = inputRows.indexOf(row);
    const input = row.inputs[inputIdx];
    const inputs = row.inputs.slice(0, inputIdx).concat([{...input, isRedacted}]).concat(row.inputs.slice(inputIdx +1));
    setInputRows(inputRows.slice(0, rowIdx).concat([{...row, inputs}]).concat(inputRows.slice(rowIdx + 1)));
  }
  console.log(inputRows);
  if (fieldEdit !== null) {
  }

  function renderSelect() {
    if (!isEditing) {
      return (
        <Select
          className="table-edit-col-select"
          id="demo-simple-select-error"
          displayEmpty
          value={numColumns}
          onChange={(ev) => {
            const num = ev.target.value;
            setNumColumns(num)
            updateInputs(num);
          }}>
          <MenuItem value={0} disabled>Select Number of Columns</MenuItem>
          <MenuItem value={1}>1 Column</MenuItem>
          <MenuItem value={2}>2 Columns</MenuItem>
          <MenuItem value={3}>3 Columns</MenuItem>
          <MenuItem value={4}>4 Columns</MenuItem>
        </Select>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="edit-header">
        <p className="table-title">Table Edit Mode</p>
        {isEditing && <Button onClick={() => handleUpdate({fieldId: fieldEdit.id})}>Update</Button>}
        <div>
          {numColumns > 0 && !isEditing && (
            <Button 
              color="primary"
              variant="contained"
              onClick={() => saveTableField(inputRows)}>Save Table</Button>
          )}
          {isEditing ? (
            <div className='btn-unsave'>
              <Button
                color='secondary'
                size='small'
                onClick={cancel}
                value="Cancel">
                Undo Changes
              </Button>
            </div>
          ): (
          <Button onClick={setEditorView}><Close></Close></Button>)}
        </div>
      </div>
      {renderSelect()}
      {inputRows.map(row => <TableRowInputs 
        className="table-row"
        markRedacted={markRedacted}
        key={row.id} 
        row={row} 
        handleChange={handleRowChange}
        numColumns={numColumns} />)}
      {numColumns > 0 && <Button onClick={addRow}><Add />Add Row</Button>}
    </>
  );
}
export default connect((state) => {
  return {
    fieldEdit: state.main.fieldEdit,
  };
}, { })(TableView);
