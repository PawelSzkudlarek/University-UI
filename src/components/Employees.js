import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap';

const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [totalElements, setTotalElements] = useState()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const fetchEmployees = async () => {
    return await fetch('http://localhost:9091/api/school/employee/findAll?page=' + page + "&size=" + size)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        if (response.status === 200) {
          return response.json()
        }
      }).catch((error) => {
        console.log('Couldn\'t get employees from server: ' + error.content)
        return []
      })
  }

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await fetchEmployees()
      setEmployees(employees.content)
      setTotalElements(employees.totalElements)
    }
    getEmployees()
    console.log(employees.length)
  }, [])


  const deleteEmployee = (id) => {
    axios.delete('http://localhost:9091/api/school/employee?id=' + id)
      .then(response => {
        if (response.status === 202) {
          setEmployees(employees.filter(emp => emp.id !== id));
        }
      });

  }


  return (
    <Card className='border border-dark'>
      <Card.Header align='center' style={{ text: 'bold' }}> Employees
      </Card.Header>
      <Card.Body>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Personal Number</th>
              <th>Type</th>
              <th>Work Area</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.person.name}</td>
                  <td>{employee.person.lastName}</td>
                  <td>{employee.person.email}</td>
                  <td>{employee.person.personalNumber}</td>
                  <td>{employee.person.personType}</td>
                  <td>{employee.workArea}</td>
                  <td>
                    <ButtonGroup>
                      <Button size='sm' variant='outline-primary'> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Button>
                      <Button size='sm' variant='outline-primary'> <FontAwesomeIcon icon={faTrash} onClick={() => deleteEmployee(employee.id)}></FontAwesomeIcon></Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tr align='center'>
            <td>Total amount of employees {totalElements}</td>
          </tr>
        </Table>
      </Card.Body>
      <Card.Footer>
        <div style={{ 'float': 'left' }}>Showing Page: </div>
        <div style={{ 'float': 'right' }}>Right</div>
      </Card.Footer>
    </Card>
  )
}


export default Employees

