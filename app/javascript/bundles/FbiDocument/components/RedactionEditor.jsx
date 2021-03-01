import React, { useState } from 'react';
import {
  Editor,
  RichUtils,
  Modifier,
  CompositeDecorator,
  AtomicBlockUtils,
  EditorState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RedactionModal from './RedactionModal';

function Redaction(props) {
  const { entityKey } = props;
  const { code } = props.contentState.getEntity(entityKey).data;
  return (
    <span>{code}</span>
  )
}


function styleBlock(contentBlock) {
  const type = contentBlock.getType();

  console.log(type);
  if (type === 'atomic') {
    return 'atomic';
  } else {
    return 'unstyled-block'
  }
}

function renderBlock(contentBlock) {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    contentBlock;
    return {
      component: RedactionBlock,
      editable: false
    }
  }
}

function RedactionBlock(props) {
  return (
    <span>a redaction</span>
  )
}

function findRedactions(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (char) => {
      const key = char.getEntity();
      console.log(char)
      console.log(key);
      return (
        key !== null &&
        contentState.getEntity(key).getType() === 'REDACTION'
      );
    },
    callback
  );
}

const decorator = new CompositeDecorator([
  {
    strategy: findRedactions,
    component: Redaction,
  }
])

function handleRedaction(state, setEditorState, redactionCode) {
  console.log(state);
  const contentState = state.getCurrentContent();
  const stateWithEntity = contentState.createEntity("REDACTION", "IMMUTABLE", {
    code: redactionCode
  });

  const key = stateWithEntity.getLastCreatedEntityKey();

  const newState = EditorState.set(state, {
    currentContent: stateWithEntity
  });

  const stateWithRedaction = AtomicBlockUtils.insertAtomicBlock(
    newState,
    key,
    " "
  );

  setEditorState(stateWithRedaction);
}

export default function Edit() {
  const [ editorState, setEditorState ] = useState(() => (
    EditorState.createEmpty(decorator)
  ));

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ currentRedcationCode, setCurrentRedactionCode ] = useState('');

  return (
    <>
      <button onClick={() => handleBold(setEditorState, editorState)}>The Big Bad Bold</button>
      <button onClick={() => setModalOpen(true)}>Insert Redaction</button>
      <button onClick={() => console.log(editorState.getSelection())}>log selection</button>
      <p>Redaction Code: {currentRedcationCode}</p>
      <div className="field-editor">
        <RedactionModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          onSubmit={({redactionCode}) => {
            setCurrentRedactionCode(redactionCode)
            handleRedaction(editorState, setEditorState, redactionCode);
            setModalOpen(false)
          }} />
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={styleBlock}
        />
      </div>
    </>
  );
}
