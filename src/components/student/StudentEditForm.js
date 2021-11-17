import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

const StudentEditForm = ({ id }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [response, setResponse] = useState();

    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [semester, setSemeter] = useState()
    const [personalNumber, setPersonalNumber] = useState()
    const [city, setCity] = useState()
    const [street, setStreet] = useState()
    const [houseNo, setHouseNo] = useState()
    const [postCode, setPostCode] = useState()

    useEffect(() => {
        axios.get('http://localhost:9091/api/school/student/details?id=' + id)
            .then(res => {
                setName(res.data.name)
                setLastName(res.data.lastName)
                setPhoneNo(res.data.phoneNo)
                setSemeter(res.data.semester)
                setPersonalNumber(res.data.personalNumber)
                setCity(res.data.address.city)
                setStreet(res.data.address.street)
                setHouseNo(res.data.address.houseNo)
                setPostCode(res.data.address.postCode)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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
                login: login,
                city: city,
                personalNumber: personalNumber
            })
        })
            .then(response => response.json())
            .then(data => { setResponse(data) });
        console.log(response)
    }

    return (
        <form className='add-from' onSubmit={handleSubmit(submit)}>
            <div className='form-control'>
                <input type='text' name='Name' placeholder='name' defaultValue={name} {...register('name')} />
                <input type='text' name='LastName' placeholder='lastName' defaultValue={lastName} {...register('lastName')} />
                {/* <input type='text' placeholder='Email' {...register('email')} /> */}
                <input type='text' placeholder='City' defaultValue={city} {...register('city', { required: true })} />
                {errors.city && errors.city.type === "required" && <span className='errorSpan'>Field is required</span>}
                <input type='number' placeholder='Personal number' defaultValue={personalNumber} {...register('personalNumber', { required: true, minLength: 11, maxLength: 11 })} />
                {errors.personalNumber && errors.personalNumber.type === "required" && <span className='errorSpan'>Field is required</span>}
                {errors.personalNumber && errors.personalNumber.type === "minLength" && <span className='errorSpan'>Personal Number has to have 11 digits</span>}
                {errors.personalNumber && errors.personalNumber.type === "maxLength" && <span className='errorSpan'>Personal Number has to have 11 digits</span>}
                

                {/* address */}
                <input type='submit' value='Save' />
            </div>
        </form>
    )
}

export default StudentEditForm