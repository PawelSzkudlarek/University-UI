import Button from './Button'
import { useState } from 'react'
import { useHistory } from "react-router-dom";

const Header = ({loggedInFunc}) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory();

  const onClickLoginBtn = () => {
    setLoggedIn(true)
    loggedInFunc(true)
  }

  const onClickLogoutBtn = () => {
    setLoggedIn(false)
    loggedInFunc(false)
  }

  function onClickHomeBtn() {history.push("/");}

  const onClickContactBtn = () =>  {history.push("/contact");}

  return (
    <div>
      <header className='header'>
        <div>
          <h1 className='universityHeader'>University</h1>
        </div>
        <div>
          <Button text='Home' className={'header-btn'} onClickFunc={onClickHomeBtn}/>
          <Button text='Contact' className={'header-btn'} onClickFunc={onClickContactBtn}/>
          {!loggedIn && <Button text='Login'  className={'header-btn-login'} onClickFunc={onClickLoginBtn} />}
          {loggedIn  && <Button text='Logout' className={'header-btn-login'} onClickFunc={onClickLogoutBtn} />}
        </div>
      </header>
    </div>
  )
}

export default Header
