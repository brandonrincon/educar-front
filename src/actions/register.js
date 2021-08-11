import { toast } from 'react-toastify';
import axios from "axios";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return (dispatch) => {
    if (payload.creds.email.length > 0 && payload.creds.password.length > 0) {
      const body={
        correo:payload.creds.email,
        apellido:payload.creds.apellidos,
        nombre:payload.creds.nombres,
        pin:payload.creds.pin,
        clave:payload.creds.password,
        curso:payload.creds.curso,
        grado:payload.creds.grado,
        colegio:1
      }
      axios.post(`http://localhost:5000/usuario/store`,JSON.stringify(body),{
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            if(res.status==201){
              toast.success(res.data);
              payload.history.push('/login');
            }else {
              toast.error('Error de registro');
              dispatch(registerError("Error de registro"));
            }
          });
    } else {
      dispatch(registerError("Verifique la informacion agregada"));
    }
  }
}
