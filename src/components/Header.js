import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext, UserRoleContext } from "../App";
import Button from './Button';

const Header = ({ setUserRole }) => {
  const history = useHistory();

  const onClickLoginBtn = () => {
    history.push('/loginPage')
  }

  const onClickLogoutBtn = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    setUserRole(null)
    history.push("/")
  }

  const onClickHomeBtn = () => { history.push("/"); }
  const onClickContactBtn = () => { history.push("/contact"); }

  const dark = useContext(ThemeContext)
  const userRole = useContext(UserRoleContext)

  return (
    <div>
      <header className='header'>
        <div>
          <h1 className='universityHeader'>University</h1>
        </div>
        <div style={{ 'margin-right': '20px' }}>
          <div>
            {dark && <Button text='ShowButton' className={'header-btn'} />}
          </div>
          <Button text='Home' className={'header-btn'} onClickFunc={onClickHomeBtn} />
          <Button text='Contact' className={'header-btn'} onClickFunc={onClickContactBtn} />
          {!userRole && <Button text='Login' className={'header-btn-login'} onClickFunc={onClickLoginBtn} />}
          {userRole && <Button text='Logout' className={'header-btn-login'} onClickFunc={onClickLogoutBtn} />}
        </div>
      </header>
      {userRole && <div style={{ float: "right", marginRight: '20px' }}>Logged as: {userRole}</div>}
    </div>
  )
}

export default Header
