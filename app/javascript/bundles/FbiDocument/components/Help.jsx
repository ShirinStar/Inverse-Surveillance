import React from 'react';

export default function Help() {
  return (
    <>
      <div className='admin-header'>
        <a onClick={() => window.history.back() }
        >Go Back</a>
      </div>
      <div className='help-cointainer'>
      <div className='help-view'>
        <h1>Here is an embed 1min toturial video</h1>
        <h2>Here are the steps </h2>
          <ol>
            <li>first setp</li>
            <li>second step</li>
            <li>third step </li>
            <li>fourth step</li>
          </ol>
          <h2>How to read the redaction codes</h2>
          <p>Seome kind of image and text about matching redaction code to redaction field</p> 
          <br/>
          <br/>
          <h2>What info to ignore</h2>
          <p>Seome kind of image and text about that</p> 
          <br/>
          <br/>
          <p>contact info</p>
      </div>
      </div>
    </>
  )
}
