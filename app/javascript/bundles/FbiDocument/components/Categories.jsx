import React from 'react';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import transcript from 'images/302c.png';
import transcriptLabel from 'images/302c_labels.png';
import transcriptText from 'images/302c_text.png';
import transcriptRedact from 'images/302c_code.png';

import CORR from 'images/CORR.png';
import corrLabel from 'images/CORR_labels.png';
import corrText from 'images/CORR_text.png';
import corrRedact from 'images/CORR_code.png';

import GEN from 'images/GEN.png';
import genLablel from 'images/GEN_labels.png';
import genText from 'images/GEN_text.png';
import genRedact from 'images/GEN_code.png';

import Memo from 'images/Memo.png';
import memoLabel from 'images/Memo_labels.png';
import memoText from 'images/Memo_text.png';
import memoRedact from 'images/Memo_code.png';

import PPL from 'images/ppl.png';
import pplLabel from 'images/ppl_labels.png';
import pplText from 'images/ppl_text.png';
import pplRedact from 'images/ppl_code.png';
import pplTable from 'images/ppl_table.png';

import { FormatItalic } from '@material-ui/icons';


export default function Categories(props) {
  const { docCat } = props

  if (docCat == '302s') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'>You are working on a document that includes three areas that you will need to populate: Date, Main Section and a Footer. </span>
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={transcript} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          <br />
          <span className='instruction-start'>How to start:</span> <br />
          1• Before starting, please visit the Help <i>(?)</i> button at the top right hand-side of the page to view a short video tutorial and FAQ’s. <br/>
          2• To start working on the document, first type or select a section label. (ie. “Date” )
          <Tooltip 
            interactive 
            leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={transcriptLabel} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />

          3• Fill out the corresponding text field. (ie. “11/12/1999”)
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={transcriptText} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip> <br />

        4• The place where words or sentences have been whited out are called redactions, most of the time a redaction has a corresponding code on the far right side of the page. Choose the size of the redaction and fill out the corresponding code. 
          When there is a redaction but no clear code, type<i>MISS</i>. 
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={transcriptRedact} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
        5• Please consider the main body of the document as one long field and give it the label<strong>"main section".</strong><br />
        6• Continue to copy the text and redactions as they appear in the  document, adding new fields as appropriate.<br />
        7• For the footer section, please fill out labels for each row.<br />
        8•  Sometimes, your document may contain additional, please include these as well and try your best to replicate the document as it appears.
      </p>
      </div>
    )
  } else if (docCat == 'CORR') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'> You are working on a letter format document.</span>
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={CORR} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          <br />

          <span className='instruction-start'>How to start: </span> <br />
        1• Before starting, please visit the Help <i>(?)</i> button at the top right hand-side of the page to view a short video tutorial and FAQ’s. <br/> 
        2• To start working on the document, first type or select a section label. (ie. “Date” )
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={corrLabel} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
        3• Fill out the corresponding text field. (ie. “11/12/1999”)
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={corrText} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip> <br />
        4. The place where words or sentences have been whited out are called redactions, most of the time a redaction has a corresponding code on the far right side of the page. 
        Choose the size of the redaction and fill out the corresponding code. When there is a redaction but no clear code, type <i>MISS</i>. 
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={corrRedact} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
        5• Please consider the main body of the document as one long field and give it the label <strong>"main section".</strong> 
        This section may continue to the following pages.<br />
        6• Continue to copy the text and redactions as they appear in the  document, adding new fields as appropriate. <br />
        7• Sometimes, your document may contain additional, please include these as well and try your best to replicate the document as it appears.
        </p>
      </div>
    )
  } else if (docCat == 'GEN') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'> You are working on a document that includes three areas that you will need to populate: labels and fields.</span>
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={GEN} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          <br />

          <span className='instruction-start'>How to start:</span> <br />
          1• Before starting, please visit the Help <i>(?)</i> button at the top right hand-side of the page to view a short video tutorial and FAQ’s. <br/> 
          2• To start working on the document, first type or select a section label. (ie. “Date” )
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={genLablel} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          3• Fill out the corresponding text field. (ie. “11/12/1999”)
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={genText} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip> <br />
         4• The place where words or sentences have been whited out are called redactions, most of the time a redaction has a corresponding code on the far right side of the page. 
         Choose the size of the redaction and fill out the corresponding code. When there is a redaction but no clear code, type <i>MISS</i>. 
         <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={genRedact} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          5• Continue to copy the text and redactions as they appear in the  document, adding new fields as appropriate.<br />
          6• Usually the label 'Details' contains long text that might continue to a more than one page.<br />
          7• Sometimes, your document may contain additional, please include these as well and try your best to replicate the document as it appears.
        </p>
      </div>
    )
  } else if (docCat == 'MEMO') {
    return (

      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'> You are working on a document that includes three areas that you will need to populate: labels and fields.</span>
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={Memo} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          <br />

          <span className='instruction-start'>How to start:</span> <br />
        1• Before starting, please visit the Help <i>(?)</i> button at the top right hand-side of the page to view a short video tutorial and FAQ’s. <br/> 
        2• To start working on the document, first type or select a section label. (ie. “Date” ).
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={memoLabel} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
        3• Fill out the corresponding text field. (ie. “11/12/1999”)
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={memoText} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip> <br />
        4• The place where words or sentences have been whited out are called redactions, most of the time a redaction has a corresponding code on the far right side of the page. 
        Choose the size of the redaction and fill out the corresponding code. When there is a redaction but no clear code, type <i>MISS</i>. 
        <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={memoRedact} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
        5• Usually the label 'Details' contains long text that might continue to a more than one page.<br />
        6• Continue to copy the text and redactions as they appear in the  document, adding new fields as appropriate. <br />
        7•  Sometimes, your document may contain additional, please include these as well and try your best to replicate the document as it appears.
        </p>
      </div>
    )
  } else if (docCat == 'ORGS-PPL') {
    return (
      <div className='document-instruction-div'>
        <p className='document-instruction'>
          <span className='doc-type'>You are working on a document that includes three areas that you will need to populate: Date, a Text section and a Table.</span>
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={PPL} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          <br />
          <span className='instruction-start'>How to start:</span> <br />
          1• Before starting, please visit the Help <i>(?)</i> button at the top right hand-side of the page to view a short video tutorial and FAQ’s. <br/> 
          2• To start working on the document, first type or select a section label. (ie. “Date” )
            <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={pplLabel} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />

          3• Fill out the corresponding text field. (ie. “11/12/1999”)
            <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={pplText} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip> <br />

          4• The place where words or sentences have been whited out are called redactions, most of the time a redaction has a corresponding code on the far right side of the page. 
          Choose the size of the redaction and fill out the corresponding code. When there is a redaction but no clear code, type <i>MISS</i>. 
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={pplRedact} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br />
          5• Continue to copy the text and redactions as they appear in the  document, adding new fields as appropriate. <br />
          6• For the table section, click the 'add table' button and select number of columns.
          <Tooltip interactive leaveDelay={600}
            title={
              <React.Fragment>
                <img className='hover-image instruction' src={pplTable} />
              </React.Fragment>
            }>
            <Button color='secondary'><LiveHelpIcon fontSize="small"></LiveHelpIcon></Button>
          </Tooltip>
          <br /> Add as much raws as needed and mark any redacted raws with attached redaction button above each cell.
          7• Sometimes, your document may contain additional, please include these as well and try your best to replicate the document as it appears<br />
        </p>
      </div>
    )
  }
  else {
    return ''
  }

}