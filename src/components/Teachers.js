import React from 'react'
import { useState, useEffect } from 'react'
import Person from './Person'
const Teachers = () => {

const [teachers, setTeachers] = useState([])

const fetchTeachers = async () => {
    const res = await fetch('http://localhost:9091/api/school/teacher/findAll')
    .then(response => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }

      if(response.status === 200){
        return response
      }
    }).catch((error) => {
      console.log('Couldn\'t get teachers from server: ' + error.message)
      return []
    })
    return await res.json()
  }

  useEffect(() => {
    const getTeachers = async () => {
      const teachers = await fetchTeachers()
      setTeachers(teachers)
    }
    getTeachers()
  }, [])

  return (
    <div>
      <div>
          {teachers.map((teacher) => (
              <div key={teacher.id}> 
                  <Person person={teacher}  />
              </div>
          ))}
      </div>
    </div>
  )
}


export default Teachers

