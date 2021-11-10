import { useState, useEffect } from 'react'
import Student from './Student'
import Button from './Button'
import StudentForm from './StudentForm'

//rafc shortcut

const Students = () => {

  const [students, setStudents] = useState([])

  const onDelete =  (id) => {
    const res = fetch(`http://localhost:9091/api/school/student?id=${id}`, {
      method: 'DELETE',
    }).catch(error => {
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
    const data = await res.json()
    return data
  }

  const [showAddStudentForm, setShowAddStudentForm] = useState(false) 
  const color = showAddStudentForm ? 'darkRed' : 'green'
  const text = showAddStudentForm ? 'Close Creator' : 'Add Student'

  return (
    <div>
      <div>
        <Button color={color} text={text} onClickFunc={() => {setShowAddStudentForm(!showAddStudentForm)}}/>
      </div>
      <div>
        {showAddStudentForm && <StudentForm className='studetForm'/>}
      </div>
      {!showAddStudentForm && <div>
          {students.map((student) => (
              <div key={student.id}> 
                  <Student student={student} onDelete={onDelete} />
              </div>
          ))}
      </div>}
    </div>
  )
}


export default Students



