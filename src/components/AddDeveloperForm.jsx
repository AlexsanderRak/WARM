import React, { useState } from 'react';
import './AddDeveloperForm.sass';

import { connect } from 'react-redux';
import { is_sending } from '../reducers/Action'




function AddDeveloperFormFunction(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [role, setRole] = useState('');

  function clickButton(firstName, lastName, email, skills, qualification, specialization, role, props) {
    props.dispatch(is_sending(true));
    var body = `firstName=${firstName}&lastName=${lastName}&email=${email}&skills=${skills}&qualification=${qualification}&specialization=${specialization}&role=${role}&companiesName=${props.storeState.profile.company}`;
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/KP_webServlet__server_war_exploded/addPerson', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(body);
    request.onload = (res)=>{
      let response = {}
      request.response.split(',').map((el) => {
        let array = el.split(':');
        response[array[0]] = array[1]
      });
      debugger
      if (response.value === "all good") {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSkills('');
        setQualification('');
        setSpecialization('');
        setRole('');
        props.dispatch(is_sending(false));
      }
    };
    request.onerror= (error) => {
      console.log("error", error);
      props.dispatch(is_sending(false));
    }
  }

  return (
    <div className="addDeveloperForm">
      <div className="form-header">
        <h3>Please add new Developer</h3>
      </div>
      <div className="inputBlock">
        <input className="inputRF" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Level qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} type="text" />
        <input className="inputRF" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} type="text" />
      </div>
      <div className="submitBlock">
        <span className="btnSendForm" onClick={() => clickButton(firstName, lastName, email, skills, qualification, specialization, role, props)}>Add new Developer</span>
      </div>
    </div>
  );
}

const AddDeveloperForm = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(AddDeveloperFormFunction);

export default AddDeveloperForm;
