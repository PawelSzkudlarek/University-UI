import { useState, useEffect } from 'react'
import Student from './Student'
import Button from './../Button'
import StudentForm from './StudentForm'

//rafc shortcut

const Students = () => {
const [students, setStudents] = useState([])

// Delete Student by Id
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
  
  //Get All Students
  const fetchStudents = async () => {
    return await fetch('http://localhost:9091/api/school/student/findAll')
    .then(response => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }

      if(response.status === 200){
        return response.json()
      }
    }).catch((error) => {
      console.log('Couldn\'t get students from server: ' + error.message)
      return []
    })
  }

  useEffect(() => {
    const getStudents = async () => {
      const students = await fetchStudents()
      setStudents(students.content)
    }
      getStudents()
  }, [])

  const [showAddStudentForm, setShowAddStudentForm] = useState(false) 
  const addCloseButtonText = showAddStudentForm ? 'Close Creator' : 'Add Student'

  return (
    <div>
      <div>
        <Button className={'header-btn'} text={addCloseButtonText} onClickFunc={() => {setShowAddStudentForm(!showAddStudentForm)}}/>
      </div>
      <div>
        {showAddStudentForm && <StudentForm className='studetForm'/>}
      </div>
      {!showAddStudentForm && <div>
          {students.map((student) => (
              <div key={student.id}> 
                  <Student student={student} onDelete={deleteStudent} />
              </div>
          ))}
      </div>}
    </div>
  )
}


export default Students



