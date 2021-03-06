import React from 'react';
import Categories from './Categories';
import moment from 'moment';

export default function InstructionInfo(props) {
  const {
    docUrl,
    digitalDocument,
    startSerialNumber,
    pageNumber,
    pageCount,
    docCat
  } = props;
  const date = moment(digitalDocument.document_date);
  const formattedDate = date.format('MM/DD/YYYY');

  return (
    <>
      <div className='document-titles'>
        <h2 className='instructionTitle'>Document Form</h2>
        <p >
          <a className='orginal-link' target="_blank" href={docUrl}>Link to the Original Document</a>
        </p>
      </div>
      <div className='document-info'>
        <p><strong>Document Date:</strong> {formattedDate}</p>
        <p><strong>Serial Number:</strong> {startSerialNumber}</p>
        <p className='document-info-last'><strong>Current page:</strong> {pageNumber} / {pageCount}</p>
      </div>

      <Categories docCat={docCat} />
    </>
  );
}
