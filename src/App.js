import { useState} from 'react'
import './App.css';
import Header from './components/Header';
import Students from './components/Students';

function App() {

const [showStudents, setShowStudents] = useState(false)
  
const onClickStudentbtn = () => {
    setShowStudents(!showStudents)
}

  return (
    <div>
      <h1 className='university'>University</h1>
        <div>
          <Header onClickStudentbtn={onClickStudentbtn}/>
        </div>
        <div>
          {showStudents && <Students/>}
        </div>
    </div>
  );
}

export default App;
