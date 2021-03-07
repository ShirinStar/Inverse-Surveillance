import React from 'react';

export default function Approval(props) {
  const { date, fields } = props;
  return (
    <>
      <p>Document Date: {date}</p>
      <pre>{fields}</pre>
    </>
  )
}

