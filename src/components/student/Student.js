import React from 'react'
import { FaTimes} from 'react-icons/fa'
import { CgDetailsMore} from 'react-icons/cg'
import { useState, useEffect} from 'react'
import StudentDetails from './StudentDetails'

const Student = ({ student , onDelete}) => {

const [showStudentDetails, setShowStudentDetails] = useState(false)
// const [details, setDetails] = useState()

//     // // Get Students detials by Id
//     const fetchStudentDetails = async (id) => {
//       return await fetch('http://localhost:9091/api/school/student/details?id='+id)
//       .then(response => {
//         if (response.status >= 400 && response.status < 600) {
//           throw new Error("Bad response from server");
//         }
//         if(response.status === 200){
//           console.log(response.json)
//           return response.json()
//         }
//       }).catch((error) => {
//         console.log('Couldn\'t get studentsDetials for for id: ' + id + ' from server: ' + error.message)
//         return []
//       })
//     }

// useEffect(() => {
//   const fetch = async () => {
//     const details = await fetchStudentDetails(student.id)
//     setDetails(details)
//   }
//     fetch()
//     console.log('student\'s detail ' + details)

// }, [])

const showDetails = (id) => {
  console.log("id: " + id)
  // if(!showStudentDetails){
  //   setDetails(fetchStudentDetails(id))
  // }
  setShowStudentDetails(!showStudentDetails)
}
  return (
    <div className='student'>
        <h3 key={student.id}> {student.person.name} {student.person.lastName}
          <div className='studentsOptions'>
            <CgDetailsMore style={{color: 'rgb(27, 125, 16)'}} onClick={() => showDetails(student.id)}></CgDetailsMore>
            <FaTimes style={{color: 'rgb(146, 26, 26)'}} onClick={() => onDelete(student.id)}/>
          </div>
        </h3>
        {showStudentDetails && <StudentDetails id={student.id}></StudentDetails>}
    </div>
  )
}

export default Student
