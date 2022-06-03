import axios from 'axios';
import { setAlert } from './alert';
import { GET_MODULE, GET_MODULES, MODULE_ERROR } from './types';


  

// Add Modules
export const Modules = (formData,navigate) => async (dispatch) => {
  const config = {
    headers: {
     
      'Content-Type':'application/json',

    },
  };
  //console.log(config);
  //const body = JSON.stringify({moduleName,ModuleID,specialization,year,semester});
  
  try {
    await axios.post('/api/module',formData,config);

    dispatch(setAlert("Module Added Success",'success'));
    navigate('/ListModules');
    
    

    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((setAlert(error.msg, 'danger'))));
    }

   
  }
};

// Get all modules
export const getModules = () => async dispatch => {
  try {
      const res = await axios.get('/api/module');
      dispatch({
        type: GET_MODULES,
        payload: res.data
    });

      
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  })
  }
};

//delete Module
export const deleteModule = id => async dispatch => {
  try {
      await axios.delete(`/api/module/${id}`);

      dispatch(setAlert('Module Removed', 'success'));

      const res = await axios.get('/api/module');

      dispatch({
          type: GET_MODULES,
          payload: res.data
      });  

  } catch (err) {
      dispatch({
          type: MODULE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status } 
      });
  }
};


export const updateModuleByID = (ID, formData) => async dispatch => {
  try {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const res = await axios.put(`/api/module/${ID}`, formData, config);
      dispatch(setAlert('Module Updated', 'success'));
      
      dispatch({
          type: GET_MODULES,
          payload: res.data
      }); 

  } catch (err) {
      const errors = err.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: MODULE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}  

export const getModuleByID = ModuleID => async dispatch => {
  try {
      console.log('I reached here');

      const res = await axios.get(`/api/module/${ModuleID}`);

      


      dispatch({
          type: GET_MODULE,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: MODULE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}
    
