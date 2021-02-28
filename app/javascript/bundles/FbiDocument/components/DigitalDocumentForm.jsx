import React from 'react';
import { useForm } from 'react-hook-form';


export default function DigitalDocumentForm(props) {
  const { register, handleSubmit } = useForm();

  const { onSubmit } = props;

  return (
    <>
    <h2>
      Digital Document Form
    </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input required name="document_date" type="date" ref={register} />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
