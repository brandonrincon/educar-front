import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";
import Login from "../login/Login.js";
import { toast } from 'react-toastify';
import loginImage from "../../assets/registerImage.svg";
import { registerUser } from "../../actions/register.js";
import axios from "axios";
import Notification from "../../components/Notification/Notification";

const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_CENTER,
};

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };



  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      nombres:'',
      apellidos:'',
      grado:'',
      curso:'',
      usuario:'',
      pin:'',
      colegio:'',
      flagPassword:false
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordConfirm = this.changePasswordConfirm.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.changeCurso=this.changeCurso.bind(this);
    this.changeApellidos=this.changeApellidos.bind(this);
    this.changeColegio =this.changeColegio.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeUsuario=this.changeUsuario.bind(this);
    this.changeGrado=this.changeGrado.bind(this);
    this.changePin=this.changePin.bind(this);
    this.changePin=this.changePin.bind(this);
    this.eventPin=this.eventPin.bind(this);
    this.eventCompararPasword=this.eventCompararPasword.bind(this);
  }


  changePin(event) {
    this.setState( { pin: event.target.value });
  }

  changeEmail(event) {
    this.setState( { email: event.target.value });
  }

  changeName(event){
    this.setState( { nombres: event.target.value });
  }

  changeApellidos(event){
    this.setState( { apellidos: event.target.value });
  }

  changeCurso(event){
    this.setState( { curso: event.target.value });
  }

  changeGrado(event){
    this.setState( { grado: event.target.value });
  }

  changeColegio(event){
    this.setState( { colegio: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  changePasswordConfirm(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  changeUsuario(event) {
    this.setState({ usuario: event.target.value });
  }

  eventPin(){
    if (this.state.pin.length===0) return;
    axios.get(`http://localhost:5000/pin/${this.state.pin}`)
        .then(res => {
          const info = res.data;
          if(info.curso!=undefined)
          this.setState({
            curso:info.curso,
            grado:info.grado,
            colegio:info.nombre_colegio,
          });
        });
  }

  eventCompararPasword(){
    this.setState({
      flagPassword:this.state.password.localeCompare(this.state.passwordConfirm)===0
    },()=>{
      if(!this.state.flagPassword){
        toast(<Notification mensaje="Las contraseñas no coinciden" type='warning'/>, options);
      }
    });
  }

  doRegister(e) {
    e.preventDefault();
    if(!this.state.flagPassword){
      toast.dark("Las contraseñas no coinciden");
      return;
    }
    this.props.dispatch(registerUser({
      creds: {
        email: this.state.email,
        password: this.state.password,
        nombres: this.state.nombres,
        apellidos:this.state.apellidos,
        grado:this.state.grado,
        curso:this.state.curso,
        usuario:this.state.usuario,
        pin:this.state.pin,
        colegio: this.state.colegio,
      },
      history: this.props.history
    }));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } };

    if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="auth-page">
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Formulario de Registro</p>
                </div>
                <div className="auth-info my-2">
                  <p>Padre de familia o acudiente, en calidad de representarte legal de tu hijo(a), por favor diligencia esta ficha con los datos solicitados de el (la) niño(a) y los tuyos.</p>
                </div>
                <form onSubmit={this.doRegister}>
                  <FormGroup className="my-3">
                    <FormText>Nombres</FormText>
                    <Input id="nombres" className="input-transparent pl-3" value={this.state.nombres} onChange={this.changeName} type="text" required name="nombres" placeholder="Nombres" />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <FormText>Apellidos</FormText>
                    <Input id="apellidos" className="input-transparent pl-3" value={this.state.apellidos} onChange={this.changeApellidos} type="text" required name="apellidos" placeholder="Apellidos" />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <FormText>Usuario</FormText>
                    <Input id="usuario" className="input-transparent pl-3" value={this.state.usuario} onChange={this.changeUsuario} type="text" required name="usuario" placeholder="Usuario" />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <FormText>Email</FormText>
                    <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email" required name="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Contraseña</FormText>
                    </div>
                    <Input id="password" className="input-transparent pl-3" value={this.state.password} onChange={this.changePassword} type="password" required name="password" placeholder="******"/>
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Confirmar Contraseña</FormText>
                    </div>
                    <Input id="passwordD" className="input-transparent pl-3" value={this.state.passwordConfirm} onBlur={this.eventCompararPasword} onChange={this.changePasswordConfirm} type="password" required name="passwordD" placeholder="******"/>
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>PIN</FormText>
                    </div>
                    <Input id="pin" className="input-transparent pl-3" value={this.state.pin} onChange={this.changePin} onBlur={this.eventPin} type="text" required name="pin" placeholder="xxxxxx"/>
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Colegio</FormText>
                    </div>
                    <Input id="colegio" className="input-transparent pl-3" value={this.state.colegio} onChange={this.changeColegio} type="text" required name="colegio" placeholder="Colegio"/>
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Grado</FormText>
                    </div>
                    <Input id="grado" className="input-transparent pl-3" value={this.state.grado} onChange={this.changeGrado} type="text" required name="grado" placeholder="Primero"/>
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Curso</FormText>
                    </div>
                    <Input id="curso" className="input-transparent pl-3" value={this.state.curso} onChange={this.changeCurso} type="text" required name="curso" placeholder="A"/>
                  </FormGroup>

                  <div className="bg-widget d-flex justify-content-center">
                    <Button className="rounded-pill my-3" type="submit" color="secondary-red">Registro</Button>
                  </div>
                </form>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
