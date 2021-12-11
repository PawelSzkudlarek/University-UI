import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminNavbar from './components/AdminNavbar';
import Contact from './components/Contact';
import Employee from './components/employees/Employee';
import Employees from './components/employees/Employees';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Students from './components/students/Students';
import Student from './components/students/Student';

export const ThemeContext = React.createContext()
export const UserRoleContext = React.createContext()

function App() {

  const [role, setRole] = useState()
  function changeRole(userRole) {
    setRole(userRole)
  }

  const [dark, setDark] = useState(false)
  function toggleTheme() {
    setDark(dark => !dark)
    console.log('toggle theme')
  }

  const student = ['STUDENT']
  const admin = ['ADMIN']

  useEffect(() => {
    changeRole(JSON.parse(localStorage.getItem('userRole')))
  }, [])

  return (
    <>
      <Router>
        <div>
          <UserRoleContext.Provider value={role}>
            <ThemeContext.Provider value={dark}>
              <div>
                <Header setUserRole={setRole} />
              </div>
              <div className='navbar'>
                {admin.includes(role) && <AdminNavbar />}
              </div>
            </ThemeContext.Provider>
          </UserRoleContext.Provider>
          <div className='content'>
            <Switch>
              <Route exact path='/'>
                <Home></Home>
              </Route>
              <Route exact path='/contact'>
                <Contact></Contact>
              </Route>
              <Route exact path='/LoginPage'>
                <LoginPage setRole={changeRole}></LoginPage>
              </Route>
              {admin.includes(role) && <div>
                <Route exact path='/Students'>
                  <Students></Students>
                </Route>

                <Route exact path='/Student/:id'>
                  <Student></Student>
                </Route>
                <Route exact path='/Student'>
                  <Student></Student>
                </Route>


                <Route exact path='/Employees'>
                  <Employees></Employees>
                </Route>
                <Route exact path='/Employee/:id'>
                  <Employee></Employee>
                </Route>
                <Route exact path='/Employee'>
                  <Employee></Employee>
                </Route>
              </div>}
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
