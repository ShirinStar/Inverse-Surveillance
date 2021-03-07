import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

export default function AdminApprovalView(props) {
  const { date, fields, page_count, doc_url, doc_id, currentPage } = props;
  const [pageNumber, setPageNumber] = useState()
  const [serialNumber, setSerialNumber] = useState()

  useEffect(() => {
      setSerialNumber(fields[0].serial_number)
  })

  const parsedFields = JSON.parse(fields);
  console.log(fields[0])
  return (
    <div className='approval-view'>
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
        <div key={field.id}>
          <div className='view-page'>
            <p className='label-view'>{field.label}</p>
            <p dangerouslySetInnerHTML={{ __html: field.raw_html }}></p>
          </div>
        </div>
      ))}
      </div>
      { (currentPage != page_count) ?
        <div className='btn nextPage'>
          <a href={`http://localhost:3000/admin/documents/${doc_id}/approval?page=${currentPage-1}`}><Button variant="contained">⟵PREVIOUS PAGE</Button></a>
          <a href={`http://localhost:3000/admin/documents/${doc_id}/approval?page=${currentPage+1}`}><Button variant="contained">NEXT PAGE⟶</Button></a>
        </div>
        :
        ''
      }
    </div>
  )
}

