import React, { useState } from 'react';
import Login from './Login'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
        href={doc.original_doc_url}>Open</a>
      </td>
      <td>
        {(doc.status == 'Complete') ?
          <a target="_blank"
            href={doc.digital_doc_url}>View</a>
            :
            "Not Ready"
        }
      </td>
      <td><a href={`/turk_documents/${doc.public_id}/edit`}>Edit</a></td>
      <td>{doc.status}</td>
    </tr>
  )
}

function DocList(props) {
  const { docs, statusFilter } = props;

  const docList = statusFilter !== '' ? (
    docs.filter(doc => doc.status === statusFilter)) : docs;

  return (
    <>
      {docList.map(doc => <ListRow key={doc.id} doc={doc} />)}
    </>
  );
}

export default function AdminDocumentList(props) {
  const docs = props.docs.map(JSON.parse);
  const [ statusFilter, setStatusFilter ] = useState('');
  return (
    <>
      <div className='admin-header'>
        <a href='/'>⟵Go Back</a>
      </div>
      <div className='admin-view'>
        <h1>Admin Documents List</h1>
        <div className="filter-buttons">
          <Select
            displayEmpty
            value={statusFilter}
            onChange={(ev) => setStatusFilter(ev.target.value)}>
            <MenuItem value={''}>Show All</MenuItem>
            <MenuItem value={STATUSES.NOT_STARTED}>Not Started</MenuItem>
            <MenuItem value={STATUSES.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={STATUSES.COMPLETE}>Complete</MenuItem>
          </Select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Document Category</th>
              <th>Name</th>
              <th>Page Length</th>
              <th>[Original] Document URL</th>
              <th>Digitized Document URL</th>
              <th>Edit form access</th>
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
    </>
  );
}
