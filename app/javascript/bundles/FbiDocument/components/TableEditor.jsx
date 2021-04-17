import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
        <div key={input.key} >
          <Button onClick={() => markRedacted(row.id, input.key, !input.isRedacted)}>Mark Redacted</Button>
          <input className={input.isRedacted ? 'redacted' : ''} type="text" value={input.value}
            onChange={(ev) => handleChange(row.id, input.key, ev.target.value)} />
        </div>
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
    setInputRows([]);
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
      <Button onClick={() => setEditorView()}>Go Back To Editor View</Button>
      <Select
        value={numColumns}
        onChange={(ev) => {
          const num = ev.target.value;
          setNumColumns(num)
          updateInputs(num);
        }}>
        <MenuItem value={1}>1 Column</MenuItem>
        <MenuItem value={2}>2 Columns</MenuItem>
        <MenuItem value={3}>3 Columns</MenuItem>
        <MenuItem value={4}>4 Columns</MenuItem>
        <MenuItem value={5}>5 Columns</MenuItem>
      </Select>
      {inputRows.map(row => <TableRow 
        markRedacted={markRedacted}
        key={row.id} 
        row={row} 
        handleChange={handleRowChange}
        numColumns={numColumns} />)}
      <Button onClick={addRow}>Add Row</Button>
      <Button onClick={() => saveTableField(inputRows)}>Save Table</Button>
    </>
  );
}
