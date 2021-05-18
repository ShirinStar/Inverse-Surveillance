import React from 'react';
import Login from './Login';
import Help from '@material-ui/icons/Help';
import HelpModal from './HelpModal';

export default function AdminDocumentList() {
  return (
    <div>
      <div className='main-header'>
        <Login />
      </div>
      <div className='mainAlign'>
        <h1 className='main-title'>INVERSE SURVEILLANCE PROJECT</h1>
        <br />
        <div className='comeback'>
          <p>Thank you for participating in the research.</p>
          <br />
          <a href='' target="_blank">Please visit the Muchanical Turk page for more.</a>
        </div>
      </div>
    </div>
  );
}
