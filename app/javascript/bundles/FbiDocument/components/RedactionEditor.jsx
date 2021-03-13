import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ContentEditable from 'react-contenteditable';
import RedactionModal from './RedactionModal';
import { connect } from 'react-redux';


function insertTextAtCaret(text, range, size) {
  range.deleteContents();

  const el = document.createElement('span');

  el.contentEditable = false;
  el.classList.add('spanner');
  el.classList.add(`${size.toLowerCase()}-redaction`)
  el.textContent = text;

  range.insertNode( el   );
  range.insertNode(document.createTextNode(""));
}

function insertRedaction({ area, code, range, redactionSize }) {
  area.focus();
  insertTextAtCaret(code, range, redactionSize);
  area.dispatchEvent(new KeyboardEvent('keydown', { code: 39  }))
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

 function Edit(props) {
  const editableDiv = useRef(null);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ currentRedactionCode, setCurrentRedactionCode ] = useState('');
  const [ redactionSize, setRedactionSize ] = useState(null);
  const [ range, setRange ] = useState(null);

  const {
    onChange,
    fieldEdit,
  } = props;

   useEffect(() => {
     console.log('props are: ', props);
     if (fieldEdit !== null) {
       const el = document.createElement('div');
       el.innerHTML = fieldEdit.textBody;
       onChange(el);
       editableDiv.current.innerHTML = fieldEdit.textBody;
       console.log(fieldEdit);
     }
   }, []);

  const handleRedaction = (code, size) => {
    insertRedaction({ area: editableDiv.current, code, range, redactionSize }) 
    onChange(editableDiv.current);
  }

  const handleRedactionClick = (size)  => {
    editableDiv.current.focus();
    setRange(window.getSelection().getRangeAt(0));
    setRedactionSize(size);
    setModalOpen(true);
  }

  return (
    <>
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
            <pre> the props: {props.body} {props.label && props.label.value} {props.id}</pre>
            <Button
              onClick={() => handleRedactionClick("WORD")}
              size="small"
              variant="outlined">A Word Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("SMALL")}
              size="small"
              variant="outlined">Small Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("MEDIUM")}
              size="small"
              variant="outlined">Medium Redaction</Button>
            <Button
              onClick={() => handleRedactionClick("LARGE")}
              size="small"
              variant="outlined">Large Redaction</Button>
          </div>
          <div
            onInput={() => onChange(editableDiv.current)}
            className="editable-div"
            ref={editableDiv}
            contentEditable="true">
          </div>
        </div>
      </>
      );
}

export default connect((state) => ({
  fieldEdit: state.main.fieldEdit,
}), null)(Edit);
