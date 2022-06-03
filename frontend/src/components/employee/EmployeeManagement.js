import React, { Fragment, useState } from 'react';
import { addEmployee } from '../../actions/employee';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeManagement = ({ addEmployee, setAlert }) => {
  const [formData, setFormData] = useState({
    empNo: '',
    empName: '',
    sliitEmail: '',
    phone: '',
    department: '',
  });

  const { empNo, empName, sliitEmail, phone, department } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (document.getElementsByName('department')[0].value === '0') {
      setAlert('Select a department', 'danger');
    } else {
      addEmployee(formData);
    }
  };

  return (
    <Fragment>
      <section
        className='container container-margin-top-override'
        /* style={{ borderStyle: 'solid', borderColor: 'blue' }} */
      >
        {/* <h1 className='large text-primary'>Employee Management</h1> */}
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Employee Management
        </p>

        <Link to={`/employeeManagement`}>
          <button className='btn btn-primary'>Add Employees</button>
        </Link>
        <Link to={`/listEmployees`}>
          <button className='btn btn-primary'>List Employees</button>
        </Link>

        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            Employee's ID Number
            <small className='form-text'>
              Will be rejected if employee number already exists
            </small>
            <input
              type='text'
              placeholder='Employee Number'
              name='empNo'
              value={empNo}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className='form-group'>
            Employee's Name
            <input
              type='text'
              placeholder='Employee Name'
              name='empName'
              value={empName}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            Employee's SLIIT email
            <small className='form-text'>
              Will be rejected if employee email already exists
            </small>
            <input
              type='email'
              placeholder='Employee SLIIT email'
              name='sliitEmail'
              value={sliitEmail}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className='form-group'>
            Employee's Phone Number
            <small className='form-text'>
              Will be rejected if phone number is already used
            </small>
            <input
              type='text'
              placeholder='Phone number'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            Department
            <small className='form-text'>Departments in computing only</small>
            <select
              name='department'
              value={department}
              onChange={(e) => onChange(e)}
            >
              <option value='0'>* Select the department</option>
              <option value='SE'>SE</option>
              <option value='IT'>IT</option>
              <option value='CSNE'>CSNE</option>
              <option value='ISE'>ISE</option>
              <option value='CS'>CS</option>
              <option value='IM'>IM</option>
              <option value='DS'>DS</option>
            </select>
          </div>
          <input
            type='submit'
            className='btn btn-success'
            value='Add Employee'
          />
        </form>
      </section>
    </Fragment>
  );
};

EmployeeManagement.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addEmployee, setAlert })(EmployeeManagement);
