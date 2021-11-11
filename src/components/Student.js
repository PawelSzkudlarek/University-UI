import React from 'react'
import { FaTimes} from 'react-icons/fa'
import { CgDetailsMore} from 'react-icons/cg'

const Student = ({ student , onDelete, onDetails}) => {
  return (
    <div className='task'>
        <h3 key={student.id}> {student.person.name} {student.person.lastName}
          <div className='studentsOptions'>
            <CgDetailsMore style={{color: 'rgb(27, 125, 16)'}} onClick={() => onDetails(student.id)}></CgDetailsMore>
            <FaTimes style={{color: 'rgb(146, 26, 26)'}} onClick={() => onDelete(student.id)}/>
          </div>
        </h3> 
    </div>
  )
}

export default Student
