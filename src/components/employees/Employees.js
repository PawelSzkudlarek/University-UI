import { faEdit, faFastBackward, faFastForward, faStepBackward, faStepForward, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, FormControl, InputGroup, Table } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import CustomToast from '../toast/CustomToast';


const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState()
  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const history = useHistory();

  const findEmployees = (currentPage) => {
    currentPage -= 1;
    axios.get('http://localhost:9091/api/school/employee/findAll?page=' + currentPage + "&size=" + size)
      .then(response => response.data)
      .then(data => {
        setEmployees(data.content)
        setTotalElements(data.totalElements)
        setTotalPages(data.totalPages)
        setCurrentPage(data.number + 1)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    findEmployees(currentPage)
  }, [])


  const deleteEmployee = (id) => {
    axios.delete('http://localhost:9091/api/school/employee?id=' + id)
      .then(response => {
        if (response.status === 202) {
          setEmployees(employees.filter(emp => emp.id !== id));
          setShowDeleteToast(true)
          setTimeout(() => setShowDeleteToast(false), 2000)
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  const setPage = (page) => {
    findEmployees(page)
  }

  const changePage = event => {
    console.log('value ' + event.target.value)
    findEmployees(parseInt(event.target.value));
  }

  return (
    <div>
      {showDeleteToast && <div>
        <CustomToast
          message="Employee deleted successfully"
          toastClassName='border border danger bg-danger text-white'
          headerClassName='bg-danger text-white'
        ></CustomToast>
      </div>}
      <div>
        <Card>
          <Card.Header align='center' style={{ text: 'bold' }}> Employees</Card.Header>
          <Card.Header>
            <Button size='sm' variant='outline-dark' onClick={() => history.push('/Employee')}>Add Employee</Button>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="light">
              <thead>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Personal Number</th>
                <th>Type</th>
                <th>Work Area</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.person.name}</td>
                    <td>{employee.person.lastName}</td>
                    <td>{employee.person.email}</td>
                    <td>{employee.person.personalNumber}</td>
                    <td>{employee.person.personType}</td>
                    <td>{employee.workArea}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={'/employee/' + employee.id} className="btn btn-sm btn-outline-primary" >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>{' '}

                        <Button size='sm' variant='outline-danger'> <FontAwesomeIcon icon={faTrash} onClick={() => deleteEmployee(employee.id)}></FontAwesomeIcon></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr align='center'>
                <td>Total amount of employee: {totalElements}</td>
              </tr>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>Showing Page: {currentPage} of {Math.ceil(totalElements / size)} </div>
            <div style={{ float: "right" }}>

              <InputGroup size='sm'>
                <Button
                  type='button'
                  variant='outline-info'
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => setPage(1)}>
                  <FontAwesomeIcon icon={faFastBackward}></FontAwesomeIcon> First
                </Button>

                <Button
                  type='button'
                  variant='outline-info'
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => setPage(currentPage - 1)}>
                  <FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon>Prev
                </Button>

                <FormControl className={"page-num bg-white"} value={currentPage} onChange={changePage} />

                <Button type='button'
                  variant='outline-info'
                  disabled={currentPage === totalPages ? true : false}
                  onClick={() => setPage(currentPage + 1)}>
                  <FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon>Next
                </Button>

                <Button
                  type='button'
                  variant='outline-info'
                  disabled={currentPage === totalPages ? true : false}
                  onClick={() => setPage(totalPages)}>
                  <FontAwesomeIcon icon={faFastForward}></FontAwesomeIcon>Last
                </Button>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>

  )
}


export default Employees

