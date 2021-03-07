import React, { useState } from 'react';
import Login from './Login'
import Button from '@material-ui/core/Button';

const STATUSES = {
  COMPLETE: "Complete",
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
};

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

function DocList(props) {
  const { docs, statusFilter } = props;

  const docList = statusFilter !== null ? (
    docs.filter(doc => doc.status === statusFilter)) : docs;

  return (
    <>
    {docList.map(doc => <ListRow key={doc.id} doc={doc}/>)}
    </>
  );
}

export default function AdminDocumentList(props) {
  const docs = props.docs.map(JSON.parse);
  const [ statusFilter, setStatusFilter ] = useState(null);
  return (
    <div className='admin-view'>
      <h1>Admin Document List</h1>
      <div className="filter-buttons">
        <Button variant="outlined" onClick={() => setStatusFilter(STATUSES.COMPLETE)}>Show Only Completed</Button>
        <Button variant="outlined" onClick={() => setStatusFilter(STATUSES.IN_PROGRESS)}>Show Only In Progress</Button>
        <Button variant="outlined" onClick={() => setStatusFilter(STATUSES.NOT_STARTED)}>Show Only Not Started</Button>
        <Button variant="outlined" onClick={() => setStatusFilter(null)}>Show All</Button>
      </div>
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
          <DocList
            docs={docs}
            statusFilter={statusFilter} />
        </tbody>
      </table>
    </div>
  );
}
