import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';


const StudentDetails = ({id}) => {
  
const [phoneNo, setPhoneNo] = useState()
const [semester, setSemeter] = useState()
const [personalNumber, setPersonalNumber] = useState()
const [city, setCity] = useState()
const [street, setStreet] = useState()
const [houseNo, setHouseNo] = useState()
const [postCode, setPostCode] = useState()
 
useEffect(() => {
  axios.get('http://localhost:9091/api/school/student/details?id='+ id)
      .then(res=>{
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
},[])

  return (
    <div className='studentDetails'>
        <h4>Semester: {semester}</h4>
        <h4>Phone number: {phoneNo}</h4>
        <h4>Personal number: {personalNumber}</h4>
        <h4>Address: {city} </h4>
        <h4>street: {street}</h4>
        <h4>houseNo: {houseNo}</h4>
        <h4>post code:{postCode}</h4>
    </div>
  )
}

export default StudentDetails

