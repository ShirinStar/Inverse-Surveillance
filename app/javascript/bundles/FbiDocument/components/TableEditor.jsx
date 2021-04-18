import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';


function TableRow(props) {
  const {
    row,
    numColumns,
    handleChange,
    markRedacted,
  } = props;

  return (
    <div className="table-row">
      {row.inputs.map((input) => (
        <Box display="flex" flexDirection="column" key={input.key} >
          <Button 
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => markRedacted(row.id, input.key, !input.isRedacted)}>
            Mark As Redacted
            </Button>
          <TextField 
            placeholder={input.isRedacted ? "Insert Redaction Code" : "Enter Text"}
            multiline={true}
            className={input.isRedacted ? 'redacted' : ''} type="text" value={input.value}
            variant="outlined"
            onChange={(ev) => handleChange(row.id, input.key, ev.target.value)} />
        </Box>
      ))}
    </div>
  )
}

export default function TableView(props) {
  const {
    setEditorView,
    saveTableField,
  } = props;

  const [numColumns, setNumColumns] = useState(0);
  const [inputRows, setInputRows] = useState([]);
  const [rowCounter, setRowCounter] = useState(0);

  function updateInputs(num) {
    setRowCounter(0);
    const row = { id: 1, inputs: [], };

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
    setRowCounter(rowCounter + 1);
    const rowId = rowCounter;
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

  return (
    <>
      <div className="edit-header">
        <p className="table-title">Table Edit Mode</p>
        <div>
          {numColumns > 0 && (
            <Button 
              color="primary"
              variant="contained"
              onClick={() => saveTableField(inputRows)}>Save Table</Button>
          )}
          <Button onClick={() => setEditorView()}><Close></Close></Button>
        </div>
      </div>
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
      {inputRows.map(row => <TableRow 
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
