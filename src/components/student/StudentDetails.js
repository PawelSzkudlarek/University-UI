import React from 'react'
import {useState, useEffect} from 'react'

const StudentDetails = ({id}) => {

 // Get Students detials by Id
    // const fetchStudentDetails = async (id) => {
    //   return await fetch('http://localhost:9091/api/school/student/details?id=' + id)
    //   .then(response => {
    //     if (response.status >= 400 && response.status < 600) {
    //       throw new Error("Bad response from server");
    //     }
    //     if(response.status === 200){
    //       console.log(response.json)
    //       return response.json()
    //     }
    //   }).catch((error) => {
    //     console.log('Couldn\'t get studentsDetials for for id: ' + id + ' from server: ' + error.message)
    //     return []
    //   })
    // }

// useEffect(() => {
//   const fetch = async () => {
//     const details = await fetchStudentDetails(id)
//     setStudentDetails(details)
//   }
//   // if(studentDetails === 0){
//     fetch()
//     console.log('student\'s detail ' + studentDetails)
//     console.log('details args ' + detailsArgs)
//   // }
// }, [])

const [details, setDetails] = useState()

    // // Get Students detials by Id
    const fetchStudentDetails = async (id) => {
      return await fetch('http://localhost:9091/api/school/student/details?id='+id)
      .then(response => response.json())
      .then(response => {
        console.log('response from server... ' + response)
    })
      .catch((error) => {
        console.log('Couldn\'t get studentsDetials for for id: ' + id + ' from server: ' + error.message)
        return []
      })
    }

useEffect((id) => {
  const fetch = async () => {
    const details = await fetchStudentDetails(id)
    setDetails(details)
  }
    fetch()
    console.log('student\'s detail ' + details)
}, [])

// fetch('http://localhost:3001/questions', {
//         method: 'GET',
//         headers: {
//         "Accept": "application/json",
//         'Content-Type': 'application/json'
//         }
//     })
//     .then(response => { return response.json();})
//     .then(responseData => {console.log(responseData); return responseData;})
//     .then(data => {this.setState({"questions" : data});})

//     .catch(err => {
//         console.log("fetch error" + err);
//     });
// }

  return (
    <div className='studentDetails'>
        <h4>Phone number: {details.phoneNo}</h4>
        {/* <h4>Personal number: {detailsArgs.personalNumber}</h4>
        <h4>Address: {detailsArgs.address.city}, {detailsArgs.address.street}, {detailsArgs.address.houseNo}, zip code:{detailsArgs.address.postcode}</h4> */}
    </div>
  )
}

export default StudentDetails
