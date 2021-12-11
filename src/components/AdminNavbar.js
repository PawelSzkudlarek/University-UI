import React from 'react';
import { useHistory } from "react-router-dom";
import Button from './Button';

const AdminNavbar = () => {

  const history = useHistory()

  const onClickStudentbtn = () => {
    history.push('/students')
  }

  const onClickTeachersbtn = () => {
    history.push('/employees')
  }


  return (
    <div className='adminNavbar'>
      <Button className={'adminNavbar-btn'} text='Students' onClickFunc={onClickStudentbtn} />
      <br></br>
      <Button className={'adminNavbar-btn'} text='Employee' onClickFunc={onClickTeachersbtn} />
      {/* <Button className={'adminNavbar-btn'} text='Staff' /> */}
    </div>
  )
}

export default AdminNavbar
