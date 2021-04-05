import React, { useState } from 'react';
import Help from '@material-ui/icons/Help';
import Close from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

export default function HelpModal(props) {
  const [showModal, setModal] = useState(false);
  return (
    <div scroll="no">
      <Button variant="outlined" onClick={() => setModal(true)}><Help fontSize="large" ></Help></Button>
      {showModal && (
        <div className="modal-help">

          <Button variant="outlined" onClick={() => setModal(false)}><Close fontSize="large" ></Close></Button>

          <div className='help-cointainer'>
            <div className='help-view'>
              <h1 className='help-title'>Help & tips</h1>
              <h2>Here is an embed 1min toturial video</h2>
              <h2>Here are the steps </h2>
              <ol>
                <li>first setp</li>
                <li>second step</li>
                <li>third step </li>
                <li>fourth step</li>
              </ol>
              <h2>How to read the redaction codes</h2>
              <p>Seome kind of image and text about matching redaction code to redaction field</p>
              <br />
              <br />
              <h2>What info to ignore</h2>
              <p>Seome kind of image and text about that</p>
              <br />
              <br />
              <p>contact info</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
