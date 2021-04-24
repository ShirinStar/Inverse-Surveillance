import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TableRow from './TableRow';

export default function AdminApprovalView(props) {
  const { date, fields, page_count, doc_url, doc_id, currentPage } = props;
  const [pageNumber, setPageNumber] = useState()
  const [serialNumber, setSerialNumber] = useState()

  useEffect(() => {
    setSerialNumber(fields[0].serial_number)
  })

  const parsedFields = JSON.parse(fields);

  return (
    <div className='approval-view'>
      <div className='admin-header'>
        <a href='/admin/documents'>⟵Go Back</a>
      </div>
      <h1 className='approval-title'> Admin Document View</h1>

      <div className='view-header'>
        <div className='view-info'>
          <p><a target="_blank" href={doc_url}>Original Document Link</a></p>
          <p>Document Date: {date}</p>
          <p>Page Number: {currentPage} / {page_count} </p>
          <p>Page Serial Number: {serialNumber}</p>
        </div>
        <div>
          <div className='admin-btn'>
            <form action={`/admin/documents/${doc_id}/approve`} method="POST">
              <input
                type="hidden"
                name="authenticity_token"
                value={document.querySelector('[name=csrf-token]').content} />

              <Button
                type="submit"
                variant="contained"
                color="primary">APPROVE</Button>
            </form>
          </div>
          <div className='admin-btn'>
            <form action={`/admin/documents/${doc_id}/reject`} method="POST">
              <input
                type="hidden"
                name="authenticity_token"
                value={document.querySelector('[name=csrf-token]').content} />
              <Button
                variant="contained"
                color="secondary"
                type="submit">SEND BACK</Button>
            </form>
          </div>
        </div>
      </div>

      <div className='inner-view'>{parsedFields.map(field => (
        <div className="view-page" key={field.id}>
          {field.field_type === 'INPUT' && (
            <>
              <p className='label-view'>{field.label}</p>
              <p dangerouslySetInnerHTML={{ __html: field.raw_html }}></p>
            </>
          )}
          {field.field_type === 'TABLE' && (
            <TableRow
              isEditing={false}
              fieldEdit={null}
              field={field}
            />
          )}
        </div>
      ))}
      </div>
      <div className='btn nextPage'>
        {currentPage > 1 && (
          <a href={`/admin/documents/${doc_id}/approval?page=${currentPage - 1}`}><Button variant="contained">⟵PREVIOUS PAGE</Button></a>
        )}
        {currentPage !== page_count && (
          <a href={`/admin/documents/${doc_id}/approval?page=${currentPage + 1}`}><Button variant="contained">NEXT PAGE⟶</Button></a>
        )}
      </div>
    </div>
  );

}

