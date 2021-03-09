import React from 'react';

export default function FieldRow(props) {
  const { label, rawHtml } = props;
  return (
    <>
      <p className='filled-label'>{label}</p>
      <p className='filled-text' dangerouslySetInnerHTML={{ __html: rawHtml  }}></p>
    </>

  )
}
