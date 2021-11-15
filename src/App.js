import { useState} from 'react'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Students from './components/student/Students';
import Teachers from './components/Teachers'
import Contact from './components/Contact'
import AdminNavbar from './components/AdminNavbar';

function App() {

const [loggedIn, setloggedIn] = useState(false)

const loginState = (isLoggedIn) => {
  setloggedIn(isLoggedIn)
}

  return (
    <Router>
      <div>
          <div>
            <Header loggedInFunc={loginState}/>
          </div>
          <div className='navbar'>
            {loggedIn && <AdminNavbar/>}
          </div>

          <div className='content'>
            <Switch>
              <Route exact path='/'>
                <Home></Home>
              </Route>
              <Route exact path='/contact'>
                <Contact></Contact>
              </Route>
              {loggedIn && <div>
                <Route exact path='/students'>
                  <Students></Students>
                </Route>
                <Route exact path='/teachers'>
                  <Teachers></Teachers>
                </Route>
              </div>}
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
