import React from 'react';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import transcript from 'images/302c.png';
import CORR from 'images/CORR.png';
import GEN from 'images/GEN.png';
import Memo from 'images/Memo.png';
import markedSample from 'images/markedSample.png';
import markedFields from 'images/markedFields.jpg';
import markedRedCode from 'images/markedRedCode.png';

export default function Categories(props) {
  const { docCat } = props

  if (docCat == '302s') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'>You received a document that usually contains Date, a main section and a buttom section.</span>
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={transcript} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          <br />
          <span className='instruction-start'>How to start?</span> <br />
          1• Please type or select a section lable.
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedSample} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />

          2• Then, fill the text field that will appear below
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
        4• Please do that for each new field you're adding.<br />
        5• Please consider the main section as one long field and give it the label
          of <strong>'main section'.</strong><br />
        6• For the bottom section, please fill the labels of each row.<br />
        7• Sometimes, your document may contain addional fields before and after, please
          include them as well.<br />
        8• Before starting, please make sure to visit the instruction page <a className='link-instruction' href='/help'>here </a>.
      </p>
      </div>
    )
  } else if (docCat == 'CORR') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'> Your type of document is letter format.</span>
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={CORR} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          <br />

        <span className='instruction-start'>How to start?</span> <br />
        1• Please type or select a section lable.
        <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedSample} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
        2• Then, fill the text field that will appear below
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
        4• Please do that for each new field you're adding.<br />
        5• Please consider the main section of the letter as one long field and give it the label
        of <strong>'main section'.</strong> This section may continue to the following pages.<br />
        6• Sometimes, your document may contain addional fields before and after, please
         include them as well.<br />
        7• Sometime there will be a bottom section, please fill the labels of each row.<br />
        8• Before starting, please make sure to visit the instruction page <a className='link-instruction' href='/help'>here </a>.
        </p>
      </div>
    )
  } else if (docCat == 'GEN') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'>  Your type of document containd labels and fields.</span>
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={GEN} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          <br />

          <span className='instruction-start'>How to start?</span> <br />
          1• Please type or select a section lable.
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedSample} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          2• Then, fill the text field that will appear below
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
          4• Please do that for each new field you're adding.<br />
          5• Usually the label 'Details' contains long text that might continue to a more than one page.<br />
          6• Before starting, please make sure to visit the instruction page <a className='link-instruction' href='/help'>here </a>.
        </p>
      </div>
    )
  } else if (docCat == 'MEMO') {
    return (

      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'> Your type of document containd labels and fields. </span>
          <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={Memo} />
            </React.Fragment>
          }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
          <br />

          <span className='instruction-start'>How to start?</span> <br />
        1• Please type or select a section lable.
         <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={markedSample} />
            </React.Fragment>
           }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
          <br />
        2• Then, fill the text field that will appear below
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
        4• Please do that for each new field you're adding.<br />
        5• Usually the label 'Details' contains long text that might continue to a more than one page.<br />
        6• Before starting, please make sure to visit the instruction page <a className='link-instruction' href='/help'>here </a>.
        </p>
      </div>
    )
  }
  else {
    return 'the end'
  }

}