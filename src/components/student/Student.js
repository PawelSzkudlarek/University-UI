import React from 'react'
import { FaTimes} from 'react-icons/fa'
import { CgDetailsMore} from 'react-icons/cg'
import { AiOutlineEdit } from 'react-icons/ai'
import { useState, useEffect} from 'react'
import StudentDetails from './StudentDetails'
import StudentEditForm from './StudentEditForm'
import axios from 'axios';

const Student = ({ student , onDelete}) => {

const [showStudentDetails, setShowStudentDetails] = useState(false)
const [showEditButton, setShowEditButton] = useState(false)
const [showStudentEditForm, setShowStudentEditForm] = useState(false)

const showDetails = () => {
  setShowStudentDetails(!showStudentDetails)
  setShowEditButton(!showEditButton)
}
const [phoneNo, setPhoneNo] = useState()
const [semester, setSemeter] = useState()
const [personalNumber, setPersonalNumber] = useState()
const [city, setCity] = useState()
const [street, setStreet] = useState()
const [houseNo, setHouseNo] = useState()
const [postCode, setPostCode] = useState()

const fetchDetails = (id) => axios.get('http://localhost:9091/api/school/student/details?id='+ id)
      .then(res=>{
          setPhoneNo(res.data.phoneNo)
          setSemeter(res.data.semester)
          setPersonalNumber(res.data.personalNumber)
          setCity(res.data.address.city)
          setStreet(res.data.address.street)
          setHouseNo(res.data.address.houseNo)
          setPostCode(res.data.address.postCode)

          console.log(res.data.address.postCode)
      })
      .catch(err => {
          console.log(err);
      })

      const onClickEdit = (id) => {
        setShowStudentDetails(!showStudentDetails)
        setShowStudentEditForm(!showStudentEditForm)
        fetchDetails(id)
      }

  return (
    <div className='student'>
        <h3 key={student.id}> {student.person.name} {student.person.lastName}
          <div className='studentsOptions'>
            {showEditButton && <AiOutlineEdit onClick={() => onClickEdit(student.id)} ></AiOutlineEdit>}
            <CgDetailsMore style={{color: 'rgb(27, 125, 16)'}} onClick={() => showDetails(student.id)}></CgDetailsMore>
            <FaTimes style={{color: 'rgb(146, 26, 26)'}} onClick={() => onDelete(student.id)}/>
          </div>
        </h3>
        {showStudentEditForm && <StudentEditForm id={student.id}></StudentEditForm>}
        {showStudentDetails && <StudentDetails id={student.id}></StudentDetails>}
    </div>
  )
}

export default Student
