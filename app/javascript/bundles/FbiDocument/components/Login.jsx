import React, { useState } from "react";
// import "./Login.css";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Login() {
  const [isLogged, setIsLogged] = useState(false);
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.admin_password === "123") {
      localStorage.setItem("token", "T");
      setIsLogged({
        isLogged: true
      })
      history.push("/");
    }
  }

  const token =
      document.querySelector('[name=csrf-token]').content

    return (
      <div className="container">
        <form method='POST' action='/admin' className="form-signin">
          <input type='hidden' value= {token} name="authenticity_token"/>
              <TextField required
                id="standard-basic"
                inputRef={register}
                name="admin_password"
                label="Admin Access"
                placeholder="Admin Access"
                type="password" />
              <Button className='btn login' variant="contained" type="submit" value="Login">Login</Button>
        </form>
      </div>
    );
}
