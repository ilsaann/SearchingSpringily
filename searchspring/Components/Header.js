import React from "react";
import style from "../styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={style.header}>
        <div>About</div>
        <h1> Welcome!</h1>
        <div>Cart</div>
      </div>
    </>
  );
}
