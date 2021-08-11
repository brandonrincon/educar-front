import React from "react";
import {
  Col,
  Row,
} from "reactstrap";

import ListadoEstudiantes from "./components/ListadoEstudiantes";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="mt-4 p-4 mt-lg-0 pl-grid-col" xs={12} lg={12}>
            <ListadoEstudiantes/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
