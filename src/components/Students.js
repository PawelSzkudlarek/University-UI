import { useState, useEffect } from 'react'
import Student from './Student'
import Button from './Button'
import StudentForm from './StudentForm'

//rafc shortcut

const Students = () => {

  const [students, setStudents] = useState([])
  const [studentDetails, setStudentDetails] = useState()

  const fetchStudentDetails = async (id) => {
    const res = await fetch('http://localhost:9091/api/school/studentDetails?id=' + id)
    .then(response => {
      if(response.status === 200){
        console.log(response)
        return response
      }
    }).catch(error => {
      console.log('Couldn\'t get studentsDetials for for id: ' + id + ' from server: ' + error.message)
    })
    return await res.json()
  }

  const deleteStudent = async (id) => {
    console.log(id)
    await fetch('http://localhost:9091/api/school/student?id=' + id, {method: 'DELETE',})
      .then(response => {
        if(response.status === 204){
          console.log("succesfully deleted student")
          setStudents(students.filter(student => student.id !== id))
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  
  useEffect(() => {
    const getStudents = async () => {
      const students = await fetchStudents()
      setStudents(students)
    }
    getStudents()
  }, [])
  
  const fetchStudents = async () => {
    const res = await fetch('http://localhost:9091/api/school/student/findAll')
    .then(response => {
      if(response.status === 200){
        return response
      }
    }).catch(error => {
      console.log('Couldn\'t get students from server: ' + error.message)
      return []
    })
    return await res.json()
  }

  const [showAddStudentForm, setShowAddStudentForm] = useState(false) 
  const text = showAddStudentForm ? 'Close Creator' : 'Add Student'

  return (
    <div>
      <div>
        <Button className={'header-btn'} text={text} onClickFunc={() => {setShowAddStudentForm(!showAddStudentForm)}}/>
      </div>
      <div>
        {showAddStudentForm && <StudentForm className='studetForm'/>}
      </div>
      {!showAddStudentForm && <div>
          {students.map((student) => (
              <div key={student.id}> 
                  <Student student={student} onDelete={deleteStudent} onDetails={fetchStudentDetails} />
              </div>
          ))}
      </div>}
    </div>
  )
}


export default Students



