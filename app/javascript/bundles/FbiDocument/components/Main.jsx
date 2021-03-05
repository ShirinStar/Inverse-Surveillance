import React from 'react';
import Login from './Login';

export default function AdminDocumentList() {
  return (
    <div>
      <Login />
      <h1 className='main-title'>INVERSE SURVEILLANCE</h1>
      <div className='start-div'>
        <a className='start-link' href="/turk_documents/new">Go To Digital Document Form</a>
      </div>
    </div>
  );
}