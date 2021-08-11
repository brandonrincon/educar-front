import React, {useEffect, useState} from "react";
import {Badge, Col, Row, Table} from "reactstrap";
import s from "../../tables/Tables.module.scss";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import Widget from "../../../components/Widget/Widget";

export default function ListadoEstudiantes() {

    const [estudiantes, setEstudiantes] = useState([]);

    useEffect( ()=>{
        const fetchData= async ()=>{
            axios.get(`http://localhost:5000/usuario`).then(res=> {
                setEstudiantes(res.data);
            });
        }
        fetchData();
    },[]);

    const updateStatus = (id,estatus) => {
        console.log(id);
        const  body={
            id:id,
            activo:estatus
        };
        axios.put(`http://localhost:5000/usuario/active`,JSON.stringify(body),{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(ret=>{
            if(ret.status===200)
                setEstudiantes(
                    estudiantes.map(item=>{
                        if(item.id===id)
                            item.activo=estatus?1:0
                        return item;
                }));
        });
    }

    return (
            <Row>
                <Col>
                    <Widget>
                        <div>
                            <div className="headline-2 p-4">Estudiantes</div>
                        </div>
                        <div className="widget-table-overflow p-2">
                            <Table className="table-striped table-borderless table-hover" responsive>
                                <thead>
                                <tr>
                                    <th className={s.nameCol}>NOMBRE</th>
                                    <th>APELLIDO</th>
                                    <th>CURSO</th>
                                    <th>GRADO</th>
                                    <th>PIN</th>
                                    <th>ACTIVO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {estudiantes.map(item => (
                                    <tr key={uuidv4()}>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.curso}</td>
                                        <td>{item.grado}</td>
                                        <td>{item.pin}</td>
                                        <td>
                                            <div className="checkbox checkbox-primary">
                                                <input
                                                    id={item.id}
                                                    className="styled"
                                                    type="checkbox"
                                                    onChange={() => updateStatus(item.id,item.activo==0)}
                                                    defaultChecked={item.activo==1}
                                                />
                                                <label htmlFor={item.id}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Widget>
                </Col>
            </Row>
    )
}
