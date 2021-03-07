import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

export default function AdminApprovalView(props) {
  const { date, fields, page_count, doc_url } = props;
  const [pageNumber, setPageNumber] = useState()
  const [serialNumber, setSerialNumber] = useState()

  useEffect(() => {
    parsedFields.map(field => (
      setPageNumber(field.page_number),
      setSerialNumber(field.serial_number)

    ))
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
          <p>Page Number: {pageNumber} / {page_count} </p>
          <p>Page Serial Number: {serialNumber}</p>
        </div>
        <div>
          <div className='admin-btn'>
            <Button variant="contained" color="primary">APPROVE</Button>
          </div>
          <div className='admin-btn'>
            <Button variant="contained" color="secondary">SEND BACK</Button>
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
      { (pageNumber != page_count) ?
        <div className='btn nextPage'>
          <Button variant="contained">NEXT PAGE ➝</Button>
        </div>
        :
        ''
      }
    </div>
  )
}

