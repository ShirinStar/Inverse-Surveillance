import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const token =
    document.querySelector('[name=csrf-token]').content

  return (
    <div className="Logincontainer">
      <form method='POST' action='/admin' className="form-signin">
        <input type='hidden' value={token} name="authenticity_token" />
         <div className='login'>

              <TextField required
                id="standard-basic"
                inputRef={register}
                name="admin_password"
                label="Admin Access"
                placeholder="Admin Access"
                type="password" />
          
          <Button className='btn login' type="submit" value="Login">Login</Button>
       
        </div>
      </form>
    </div>
  );
}
