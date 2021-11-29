import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminNavbar from './components/AdminNavbar';
import Contact from './components/Contact';
import Employee from './components/employees/Employee';
import Employees from './components/employees/Employees';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Students from './components/student/Students';

function App() {

  const [loggedIn, setloggedIn] = useState(false)

  const loginState = (isLoggedIn) => {
    setloggedIn(isLoggedIn)
  }

  return (
    <Router>
      <div>
        <div>
          <Header loggedInFunc={loginState} />
        </div>
        <div className='navbar'>
          {loggedIn && <AdminNavbar />}
        </div>

        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/contact'>
              <Contact></Contact>
            </Route>
            <Route exact path='/LoginPage'>
              <LoginPage></LoginPage>
            </Route>
            {loggedIn && <div>
              <Route exact path='/students'>
                <Students></Students>
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
  );
}

export default App;
