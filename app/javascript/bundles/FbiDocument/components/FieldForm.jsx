import React from 'react';
import { useForm } from 'react-hook-form'

export default function FieldForm(props) {
  const {
    page_count,
    digitalDocument,
    saveField
  } = props;

  const { register, handleSubmit } = useForm();

  return (
    <>
      <h2>Field Form</h2>
      <h3>Document Date: {digitalDocument.document_date}</h3>
      <h4>Page Count: {page_count}</h4>
      <form onSubmit={handleSubmit(saveField)}>
        <label htmlFor="label">Label</label><br />
        <input required
          id="label"
          name="label"
          ref={register} />
        <br /><br />
        <label htmlFor="text-body">TextBody</label><br />
        <input required
          id="text-body"
          name="text_body"
          ref={register} />

        <input type="submit" />
      </form>
    </>

  );
}
