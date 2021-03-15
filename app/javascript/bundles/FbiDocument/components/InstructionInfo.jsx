import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import markedSample from 'images/markedSample.png';
import markedFields from 'images/markedFields.jpg';
import markedRedCode from 'images/markedRedCode.png';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Categories from './Categories';

export default function InstructionInfo(props) {
  const {
    docUrl,
    digitalDocument,
    startSerialNumber,
    pageNumber,
    pageCount,
    docCat
  } = props;

  return (
    <>
      <div className='document-titles'>
        <h2>Document Form</h2>
        <p >
          <a className='orginal-link' target="_blank" href={docUrl}>Link of the Original Document</a>
        </p>
      </div>
      <div className='document-info'>
        <p><strong>Document Date:</strong> {digitalDocument.document_date}</p>
        <p><strong>Page Serial Number:</strong> {startSerialNumber}</p>
        <p><strong>Current page:</strong> {pageNumber} / {pageCount}</p>
      </div>
      
      <Categories docCat={docCat}/> <br/><br/>

      <div className='document-instruction-div'>
        <p className='document-instruction'>General instructions <br />
          1• Please type or select a section lable.
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedSample} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          2• Then, fill the text field below
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedFields} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip> <br />
          3• When there is a redaction, fill the code when asked
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedRedCode} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
         <br /> 
         <br />
          Please watch & read the instructions <a className='link-instruction' href='/help'>here </a><br /><br />
        </p>
      </div>
    </>
  );
}
