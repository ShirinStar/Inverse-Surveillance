import React from 'react';
import Login from './Login';
import Help from '@material-ui/icons/Help';

export default function AdminDocumentList() {
  return (
    <div>
      <div className='main-header'>
        <Login />
        <a href='/help' className='a help'><Help fontSize="large" ></Help></a>
      </div>
      <h1 className='main-title'>INVERSE SURVEILLANCE</h1>
      <div className='start-div'>
        <a className='start-link' href="/turk_documents/new">Go To Digital Document Form</a>
      </div>
    </div>
  );
}
