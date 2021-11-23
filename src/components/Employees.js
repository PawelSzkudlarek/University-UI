import { faEdit, faFastBackward, faFastForward, faStepBackward, faStepForward, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, FormControl, InputGroup, Table } from 'react-bootstrap';

const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [totalElements, setTotalElements] = useState()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState()

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
      setTotalPages(employees.totalElements / size)
    }
    getEmployees()
  }, [])


  const deleteEmployee = (id) => {
    axios.delete('http://localhost:9091/api/school/employee?id=' + id)
      .then(response => {
        if (response.status === 202) {
          setEmployees(employees.filter(emp => emp.id !== id));
        }
      });

  }

  const getEmployees = async () => {
    const employees = await fetchEmployees()
    setEmployees(employees.content)
    setTotalElements(employees.totalElements)
  }

  const nextPage = () => {
    setPage(page + 1)
    getEmployees()
  }

  const previousPage = () => {
    setPage(page - 1)
    getEmployees()
  }

  const firstPage = () => {
    setPage(1)
    getEmployees();
  }

  const lastPage = () => {
    setPage(lastPage)
    getEmployees();
  }

  const changePage = event => {
    console.log('value ' + event.target.value)
    setPage(parseInt(event.target.value))
    getEmployees();
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
            <td>Total amount of employee: {totalElements}</td>
          </tr>
        </Table>
      </Card.Body>
      <Card.Footer>
        <div style={{ 'float': 'left' }}>Showing Page: {page} of {totalElements / size} </div>
        <div style={{ 'float': 'right' }}>
          <InputGroup size='sm'>

            <Button
              type='button'
              variant='outline-info'
              disabled={page === 1 ? true : false}
              onClick={() => firstPage}>
              <FontAwesomeIcon icon={faFastBackward}></FontAwesomeIcon> First
            </Button>

            <Button
              type='button'
              variant='outline-info' disabled={page === 1 ? true : false}
              onClick={() => previousPage()}>
              <FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon>Prev
            </Button>

            <FormControl onChange={changePage} />

            <Button type='button'
              variant='outline-info'
              disabled={page === lastPage ? true : false}
              onClick={() => nextPage}>
              <FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon>Next
            </Button>

            <Button
              type='button'
              variant='outline-info'
              disabled={page === lastPage ? true : false}
              onClick={() => lastPage}>
              <FontAwesomeIcon icon={faFastForward}></FontAwesomeIcon>Last
            </Button>
          </InputGroup>
        </div>
      </Card.Footer>
    </Card>
  )
}


export default Employees

