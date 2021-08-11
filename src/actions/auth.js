import axios from "axios";
import {toast} from "react-toastify";
import Notification from "../components/Notification/Notification";
import React from "react";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_CENTER,
};

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('authenticated');
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {

    if (creds.email.length > 0 && creds.password.length > 0) {
      const body={
        correo:creds.email,
        clave:creds.password,
      }
      axios.post(`http://localhost:5000/usuario/login`,JSON.stringify(body),{
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            if(res.status==200){
              localStorage.setItem('authenticated', true);
              localStorage.setItem('pin', res.data.pin);
              dispatch(receiveLogin());
              toast(<Notification mensaje={`Bienvenido ${res.data.nombre} ${res.data.apellido} perteneciente al grado ${res.data.grado} ${res.data.curso}`} type='success'/>, options);
              creds.history.push('/template');
            }else {
              toast.error(res.data);
              dispatch(loginError(res.data));
            }
          }).catch(e=>{
            toast(<Notification mensaje="Usuario o contraseña incorrectas" type='error'/>, options);
            dispatch(loginError('Usuario o contraseña incorrectas'));
      });
    } else {
      dispatch(loginError('Usuario o contraseña incorrectas'));
    }
  }
}

