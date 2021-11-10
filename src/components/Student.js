import React from 'react'
import { FaTimes} from 'react-icons/fa'

const Student = ({ student , onDelete}) => {
  return (
    <div className='task'>
        <h3 key={student.id}> {student.person.name} {student.person.lastName}
          <FaTimes style={{color: 'rgb(146, 26, 26)'}} onClick={() => onDelete(student.id)}/>
        </h3> 
    </div>
  )
}


export default Student
