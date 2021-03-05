import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ContentEditable from 'react-contenteditable';
import RedactionModal from './RedactionModal';


function insertTextAtCaret(text, range) {
  range.deleteContents();

  const el = document.createElement('span');

  el.contentEditable = false;
  // TODO: add size specific classes
  el.classList.add('spanner');
  el.textContent = text;

  range.insertNode( el   );
  range.collapse(false);
  range.insertNode(document.createTextNode(""));
}

function insertRedaction({ area, code, range}) {
  area.focus();
  insertTextAtCaret(code, range);
  area.blur();
  area.focus();
  area.dispatchEvent(new KeyboardEvent('keydown', { code: 39  }))
  area.focus();
}

export default function Edit(props) {
  const editableDiv = useRef(null);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ currentRedactionCode, setCurrentRedactionCode ] = useState('');
  const [ redactionSize, setRedactionSize ] = useState(null);
  const [ range, setRange ] = useState(null);

  const handleRedaction = (code, size) => {
    insertRedaction({ area: editableDiv.current, code, range }) 
  }

  const handleRedactionClick = (size)  => {
    setRange(window.getSelection().getRangeAt(0));
    setRedactionSize(size);
    setModalOpen(true);
  }

  return (
    <>
      <p>Redaction Code: {currentRedactionCode}</p>
        <RedactionModal
          open={modalOpen}
          range={range}
          redactionSize={redactionSize}
          handleClose={() => setModalOpen(false)}
          onSubmit={({redactionCode, redactionSize, range}) => {
            setCurrentRedactionCode(redactionCode)
            handleRedaction(redactionCode, redactionSize);
            setModalOpen(false)
          }} />

        <div className="field-editor">
          <div className="field-editor-controls">
            <Button
              onClick={() => handleRedactionClick("WORD")}
              variant="outlined">A Word Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("SMALL")}
              variant="outlined">Small Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("MEDIUM")}
              variant="outlined">Medium Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("LARGE")}
              variant="outlined">Large Redaction</Button>
          </div>
          <div
            className="editable-div"
            ref={editableDiv}
            contentEditable="true">
          </div>
        </div>
      </>
      );
}
