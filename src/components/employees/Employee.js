import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useParams } from 'react-router';
import CustomToast from '../toast/CustomToast';

const Employee = () => {
  const [workArea, setWorkArea] = useState('Teacher')
  const [validated, setValidated] = useState(false)
  const [createUser, setCreateUser] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [name, setName] = useState()
  const [lastName, setLastName] = useState()
  const [personalNumber, setPersonalNumber] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [username, setUserame] = useState()
  const [email, setEmail] = useState()
  const [city, setCity] = useState()
  const [street, setStreet] = useState()
  const [houseNo, setHouseNo] = useState()
  const [apartmentNo, setApartmentNo] = useState()
  const [postCode, setPostCode] = useState()

  const { id } = useParams()

  useEffect(() => {
    const employeeId = id
    if (employeeId) {
      setEditMode(true)
      axios.get('http://localhost:9091/api/school/employee/details?id=' + employeeId)
        .then(response => {
          setName(response.data.name)
          setLastName(response.data.lastName)
          setPersonalNumber(response.data.personalNumber)
          setPhoneNo(response.data.phoneNo)
          setCity(response.data.city)
          setStreet(response.data.street)
          setHouseNo(response.data.houseNo)
          setApartmentNo(response.data.apartmentNo)
          setPostCode(response.data.postCode)
          console.log(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, {})

  const onUpdate = (form) => {
    axios.put("http://localhost:9091/api/school/employee", {
      id: id,
      name: form.name.value,
      lastName: form.lastName.value,
      personalNumber: form.personalNumber.value,
      phoneNo: form.phoneNo.value,
      username: form.username === undefined ? '' : form.username.value,
      email: form.email === undefined ? '' : form.email.value,
      password: form.password === undefined ? '' : form.password,
      city: form.city.value,
      street: form.street.value,
      houseNo: form.houseNo.value,
      apartmentNo: form.apartmentNo.value,
      postCode: form.postCode.value,
      workArea: workArea,
    })
      .then(response => {
        console.log('New employee submited..')
        setShowSuccessToast(true)
        setTimeout(() => setShowSuccessToast(false), 3000)

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    console.log('UPDATE.........................XXXXXXXXXXX')
  }

  const onSubmit = (form) => {
    axios.post("http://localhost:9091/api/school/employee", {
      name: form.name.value,
      lastName: form.lastName.value,
      personalNumber: form.personalNumber.value,
      phoneNo: form.phoneNo.value,
      username: form.username === undefined ? '' : form.username.value,
      email: form.email === undefined ? '' : form.email.value,
      password: form.password === undefined ? '' : form.password,
      city: form.city.value,
      street: form.street.value,
      houseNo: form.houseNo.value,
      apartmentNo: form.apartmentNo.value,
      postCode: form.postCode.value,
      workArea: workArea,
      createUser: form.createUser.checked
    })
      .then(response => {
        console.log('New employee submited..')
        setShowSuccessToast(true)
        setTimeout(() => setShowSuccessToast(false), 3000)

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    // }
    // setValidated(true);

    id ? onUpdate(form) : onSubmit(form)
  };


  return (
    <div>
      <div>
        {showSuccessToast && <CustomToast
          message='Employee saved successfully'
          toastClassName='border border success bg-success text-white'
          headerClassName='bg-success text-white'
        ></CustomToast>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Text className="text-muted" size='sm'>Personal data</Form.Text>

        <Row>
          <Form.Group as={Col} controlId="name" >
            <Form.Control required type="text" placeholder="Name" size='sm' value={name} onChange={() => setName()} />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName" >
            <Form.Control type="text" placeholder="Last Name" size='sm' value={lastName} onChange={() => setLastName()} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="personalNumber" >
            <Form.Control type="number" placeholder="Personal Number" size='sm' value={personalNumber} onChange={() => setPersonalNumber()} />
          </Form.Group>

          <Form.Group as={Col} controlId="phoneNo" >
            <Form.Control type="number" placeholder="Phone Number" size='sm' value={phoneNo} onChange={() => setPhoneNo()} />
          </Form.Group>
        </Row>

        {!editMode &&
          <div>
            <Row>
              <Form.Text as={Col} className="text-muted" size='sm'>User</Form.Text>
              <Form.Group as={Col} controlId="createUser" >
                <Form.Check type="checkbox" label="Create user" size='sm' onChange={() => { setCreateUser(!createUser) }} />
              </Form.Group>
            </Row>

            {createUser &&
              <div>
                <Form.Group controlId="username" >
                  <Form.Control type="text" placeholder="Username" size='sm' />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Control type="email" placeholder="Enter email" size='sm' />
                </Form.Group>

                <Form.Group controlId="password" >
                  <Form.Control type="password" placeholder="Password" size='sm' />
                </Form.Group>
              </div>}

          </div>}

        <Form.Text className="text-muted" size='sm'>Address</Form.Text>

        <Form.Group controlId="city" >
          <Form.Control type="text" placeholder="City" size='sm' value={city} onChange={() => setCity()} />
        </Form.Group>

        <Form.Group controlId="street" >
          <Form.Control type="text" placeholder="Street" size='sm' value={street} onChange={() => setStreet()} />
        </Form.Group>

        <Form.Group controlId="houseNo" >
          <Form.Control type="text" placeholder="House Number" size='sm' value={houseNo} onChange={() => setHouseNo()} />
        </Form.Group>

        <Form.Group controlId="apartmentNo" >
          <Form.Control type="text" placeholder="Apartment number" size='sm' value={apartmentNo} onChange={() => setApartmentNo()} />
        </Form.Group>

        <Form.Group controlId="postCode" >
          <Form.Control type="text" placeholder="Post Code" size='sm' value={postCode} onChange={() => setPostCode()} />
        </Form.Group>
        <Form.Text className="text-muted" size='sm'>Work Area</Form.Text>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" value={workArea}>
            {workArea}
          </Dropdown.Toggle>
          <Dropdown.Menu id='workArea'>
            <Dropdown.Item onClick={() => setWorkArea('Teacher')}>Teacher</Dropdown.Item>
            <Dropdown.Item onClick={() => setWorkArea('Administration')}>Administration</Dropdown.Item>
            <Dropdown.Item onClick={() => setWorkArea('IT')}>IT</Dropdown.Item>
            <Dropdown.Item onClick={() => setWorkArea('Security')}>Security</Dropdown.Item>
            <Dropdown.Item onClick={() => setWorkArea('Maintanaces')}>Maintanace</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {editMode ?
          <Button variant="outline-success" type="submit">Update</Button> :
          <Button variant="outline-primary" type="submit">Submit</Button>
        }

      </Form>
    </div>
  )
}

export default Employee
