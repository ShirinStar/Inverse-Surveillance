import React, { useState } from 'react';

export default function HelpModal(props) {
  const [showModal, setModal] = useState(false);
  return (
    <>
      <button onClick={() => setModal(true)}>click me</button>
      {showModal && (
        <div className="modal-help">hey there</div>
      )}
    </>
  );
}
