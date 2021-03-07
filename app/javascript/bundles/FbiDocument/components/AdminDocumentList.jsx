import React from 'react';
import Login from './Login'

function ListRow({ doc }) {
  return (
    <tr>
      <td>{doc.category}</td>
      <td>{doc.name}</td>
      <td>{doc.page_length}</td>
      <td><a target="_blank"
        href={doc.original_doc_url}>click it</a>
      </td>
      <td>
        { (doc.status == 'Complete') ?
        <a target="_blank"
        href={doc.digital_doc_url}>click to view</a>
        :
        "Not Ready"
        }
      </td>
      <td>{doc.status}</td>
    </tr>
  )
}

export default function AdminDocumentList(props) {
  const docs = props.docs.map(JSON.parse);
  return (
    <div className='admin-view'>
      <h1>Admin Document List</h1>
      <table>
        <thead>
          <tr>
            <th>Document Category</th>
            <th>Name</th>
            <th>Page Length</th>
            <th>[Original] Document URL</th>
            <th>Digitized Document URL</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(doc => <ListRow key={doc.id} doc={doc}/>)}
        </tbody>
      </table>
    </div>
  );
}
