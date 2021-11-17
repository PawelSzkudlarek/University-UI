import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'

const Teachers = () => {

  const [teachers, setTeachers] = useState([])

  const fetchTeachers = async () => {
    const res = await fetch('http://localhost:9091/api/school/student/findAll?page=0&size20')
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }

        if (response.status === 200) {
          return response
        }
      }).catch((error) => {
        console.log('Couldn\'t get teachers from server: ' + error.message)
        return []
      })
    return await res.json()
  }

  useEffect(() => {
    const getTeachers = async () => {
      const teachers = await fetchTeachers()
      setTeachers(teachers.content)
    }
    getTeachers()
  }, [])

  return (
    <Card >
      <Card.Header>
        <Card.Body>
          <Table striped='true' bordered='true' hover='true'>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card.Header>
    </Card>
  )
}


export default Teachers

