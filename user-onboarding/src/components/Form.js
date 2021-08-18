import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Form(props) {
    const{
        values, submit, change, errors, disabled
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }

    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }
   
    return (
        <div>
                        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>

        </div>
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                    />
                </label>
                <label >
                    <input
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                        onChange={onChange}
                    />
                    Agree with Terms of Service
                </label>
                <button disabled ={disabled}>submit</button>
            </form>
            


        </div>
    )
}

export default Form;