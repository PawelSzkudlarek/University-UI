import React from 'react'
import Button from './Button'
import { useHistory } from "react-router-dom";

const AdminNavbar = () => {

const history = useHistory()

  const onClickStudentbtn = () => {
    history.push('/students')
  }

  return (
    <div className='adminNavbar'>
        <Button className={'adminNavbar-btn'} text='Students' onClickFunc = {onClickStudentbtn}/>
        <br></br>
        <Button className={'adminNavbar-btn'} text='Teachers' />
        <br></br>
        <Button className={'adminNavbar-btn'} text='Staff' />
    </div>
  )
}

export default AdminNavbar
