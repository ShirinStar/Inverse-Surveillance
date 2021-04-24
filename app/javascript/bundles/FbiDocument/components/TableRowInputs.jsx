import React from 'react';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function computeColKey(input) {
  return input.key === undefined ? input.col_idx : input.key;
}

export default function TableRowInputs(props) {
  const {
    row,
    handleChange,
    markRedacted,
  } = props;

  return (
    <div className="table-row">
      {row.inputs.map((input) => (
        <Box
          key={input.id}
          display="flex" flexDirection="column" key={input.id} >
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => markRedacted(row.id, computeColKey(input), !input.isRedacted)}>
            Mark As Redacted
            </Button>
          <TextField
            placeholder={input.isRedacted ? "Insert Redaction Code" : "Enter Text"}
            multiline={true}
            className={input.isRedacted ? 'redacted' : ''} type="text" value={input.value}
            variant="outlined"
            onChange={(ev) => handleChange(row.id, (computeColKey(input)), 
                ev.target.value)} />
        </Box>
      ))}
    </div>
  )
}

