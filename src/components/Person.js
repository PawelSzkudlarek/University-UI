import React from 'react'
import { FaTimes} from 'react-icons/fa'
import { CgDetailsMore} from 'react-icons/cg'

const Person = ({ person , onDelete, onDetails}) => {
  return (
      <div className='task'>
        <h3 key={person.id}> {person.person.name} {person.person.lastName}
          <div className='studentsOptions'>
            <CgDetailsMore style={{color: 'rgb(27, 125, 16)'}} onClick={() => onDetails(person.id)}></CgDetailsMore>
            <FaTimes style={{color: 'rgb(146, 26, 26)'}} onClick={() => onDelete(person.id)}/>
          </div>
        </h3> 
    </div>
  )
}

export default Person
