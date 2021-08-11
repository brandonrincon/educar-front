import React from "react";
import s from "./Footer.module.scss";

class Footer extends React.Component {
  render() {
    return (
      <div className={s.footer}>
        <span className={s.footerLabel}>2021 &copy; Educar Prueba Tecnica - Brandon Rincon</span>
      </div>
    )
  }
}

export default Footer;
