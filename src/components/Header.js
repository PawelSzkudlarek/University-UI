import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({onClickStudentbtn}) => {

  const onClickLogin = () => {
    console.log('Login..')
  }

  const onClickLogout = () => {
    console.log('Logout..')
  }

  const onClickStudents = () => {
    console.log('students..')
  }
  
  return (
    <header className='header'>
      <div>
        <Button text='Students' onClickFunc={onClickStudentbtn}/>
        <Button text='Teachers' onClickFunc={onClickStudents}/>
        <Button text='Library'/>
        <Button text='Auctioner'/>
      </div>
      <div>
        <Button color='green' text='Login' onClickFunc={onClickLogin}/>
        <Button color='green' text='Logout' onClickFunc={onClickLogout}/>
      </div>
    </header>
  )
}


export default Header
