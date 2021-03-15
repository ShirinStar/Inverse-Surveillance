import React from 'react';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import transcript from 'images/302c.png';
import CORR from 'images/CORR.png';
import GEN from 'images/GEN.png';
import Memo from 'images/Memo.png';

export default function Categories(props) {
  const {docCat} = props

  if (docCat == '302s') {
    return (
      <p>
       Your type of document usually contains Date, a main section and a buttom section.
       <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={transcript} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
       <br/>
       Please consider the main section as one long field and give it the label
       of <strong>'main section'.</strong><br/>
       For the bottom section, please type/fill the labels of each row.<br/>
       Sometimes your document may contain addional fields before and after, please
       include them as well.
       Please do not forget the redaction codes of each section. If you need help with reading them please visit the 
       <a className='link-instruction' href='/help'>help page</a>.
      </p>
    )
  } else if (docCat == 'CORR') {
    return (
      <p>
       Your type of document is letter format.
       <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={CORR} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
       <br/>
       Please consider the main section of the letter as one long field and give it the label
       of <strong>'main section'.</strong><br/>
       Sometimes your document may contain addional fields before and after, please
       include them as well and type/fill the labels for each row.
       Please do not forget the redaction codes of each section. If you need help with reading them please visit the 
       <a className='link-instruction' href='/help'>help page</a>.
      </p>
    )
  } else if (docCat == 'GEN') {
    return (
      <p>
       Your type of document containd labels and fields.
       <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={GEN} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
       <br/>
       Please include all of the field, type/fill the labels for each field.<br/>
       Usually the label 'Details' contains long text that might continue to a more than one page<br/>
       Please do not forget the redaction codes of each section. If you need help with reading them please visit the 
       <a className='link-instruction' href='/help'>help page</a>.
      </p>
    )
  } else if (docCat == 'Memo') {
    return (
      <p>
       Your type of document containd labels and fields.
       <Tooltip title={
            <React.Fragment>
              <img className='hover-image instruction' src={Memo} />
            </React.Fragment>
            }>
            <HelpOutline fontSize="small"></HelpOutline>
          </Tooltip>
       <br/>
       Please include all of the field, type/fill the labels for each field.<br/>
       Usually the label 'Details' contains long text that might continue to a more than one page<br/>
       Please do not forget the redaction codes of each section. If you need help with reading them please visit the 
       <a className='link-instruction' href='/help'>help page</a>.
      </p>
    )
  }
   else {
     return 'the end'
   } 

}