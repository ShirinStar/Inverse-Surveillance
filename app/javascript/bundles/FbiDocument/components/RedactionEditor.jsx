import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  CompositeDecorator,
  AtomicBlockUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

function Redaction(props) {
  return (
    <span>hey there</span>
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

function handleBold(onChange, state) {
  const ital = RichUtils.toggleInlineStyle(state, 'ITALICS')
  const bl = RichUtils.toggleInlineStyle(state, 'BOLD')
  onChange(ital);
}

function handleCmd(cmd, editorState, onChange) {
  const newState = RichUtils.handleKeyCommand(editorState, cmd);

  console.log('called');
  if (newState) {
    onChange(newState);
    return 'handled';
  }

  return 'not-handled';
}

function handleRedaction(state, setEditorState) {
  console.log(state);
  const contentState = state.getCurrentContent();
  const stateWithEntity = contentState.createEntity("REDACTION", "IMMUTABLE", {
    code: 'A3'
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

function Edit() {
  const [ editorState, setEditorState ] = useState(() => (
    EditorState.createEmpty(decorator)
  ));

  return (
    <>
      <button onClick={() => handleBold(setEditorState, editorState)}>The Big Bad Bold</button>
      <button onClick={() => handleRedaction(editorState, setEditorState)}>Insert Redaction</button>
      <button onClick={() => console.log(editorState.getSelection())}>log selection</button>
      <div className="field-editor">
    <Editor
      editorState={editorState}
      handleKeyCommand={(cmd, editorState) => handleCmd(cmd, editorState, setEditorState)}
      onChange={setEditorState}
      blockStyleFn={styleBlock}
      blockRendererFn={renderBlock}
    />
      </div>
    </>
  );
}

export default function(props) {
  return (
    <>
      <div>hey there</div>
      <Edit />
    </>
  );
}
