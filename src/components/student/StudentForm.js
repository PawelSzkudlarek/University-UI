import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react'

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [response, setResponse] = useState();

  const submit = (data) => {
    const name = data.name
    const lastName = data.lastName
    const email = data.email
    const login = data.login
    const city = data.city
    const personalNumber = data.personalNumber

    fetch('http://localhost:9091/api/school/student/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        email: email,
        username: login,
        city: city,
        personalNumber : personalNumber
      })
    })
    .then(response => response.json())
    .then(data => {setResponse(data)});
    console.log(response)
  }

  return (
    <form className='add-from' onSubmit={handleSubmit(submit)}>
        <div className = 'form-control'>
            <input type='text' name ='Name' placeholder='name' {...register('name')}/>
            <input type='text' name ='LastName' placeholder='lastName' {...register('lastName')}/>
            <input type='text' placeholder='Email' {...register('email')}/>
            <input type='text' placeholder='City'{...register('city', { required: true})}/>
              {errors.city && errors.city.type === "required" && <span className='errorSpan'>Field is required</span>}
            <input type='number' placeholder='Personal number'{...register('personalNumber', { required: true, minLength: 11, maxLength:11})}/>
              {errors.personalNumber && errors.personalNumber.type === "required" && <span className='errorSpan'>Field is required</span>}
              {errors.personalNumber && errors.personalNumber.type === "minLength" && <span className='errorSpan'>Personal Number has to have 11 digits</span>}
              {errors.personalNumber && errors.personalNumber.type === "maxLength" && <span className='errorSpan'>Personal Number has to have 11 digits</span>}
            <input type='text' placeholder='Login'{...register('login')}/>
            <input type='submit' value ='Create Student'/>
        </div>
    </form>
  )
}

export default StudentForm
