import Form from './components/Form';
import './App.css';
import React, { useState, useEffect } from 'react';

// 🔥 STEP 1- CHECK THE ENDPOINTS IN THE README
// 🔥 STEP 2- FLESH OUT FriendForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP

import schema from './components/validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';
import User from './components/User'
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  email: '',
  password:'',
  ///// CHECKBOXES /////
  tos: false,

}
const initialFormErrors = {
  name: '',
  email: '',
  password:''
}
const initialUsers = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)  

  const getUsers = () =>{
    axios.get('https://reqres.in/api/users')
      .then(res =>{
        console.log(res.data)
        setUsers(res.data.data)
      }).catch(err => console.error(err))
  }

  const postNewUser = newUser =>{
    axios.post('https://reqres.in/api/users', newUser)
      .then(res =>{
        setUsers([res.data, ...users]);
      }).catch(err => console.error(err))

      setFormValues(initialFormValues);
  }

  const validate = (name, value)=>{
    yup.reach(schema, name)
      .validate(value)
      .then(() =>setFormErrors({...formErrors, [name]: ''}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name,value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name,
      email: formValues.email.trim(),
      hobbies: ['tos']

    }

    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  return (
    <div className="App">
      <Form
        values = {formValues}
        change ={inputChange}
        submit ={formSubmit}
        errors = {formErrors}
        disabled = {disabled}
      />

      {
        users.map(user =>{
          return(
            <User key = {user.id} details = {user}/>
          )
        })
      }


    </div>
  );
}

export default App;
