import React from 'react';

export default function AdminDocumentList(props) {
  return (
    <>
    <h1>Admin Document List</h1>
    <pre>{props.docs}</pre>
    </>
  );
}
