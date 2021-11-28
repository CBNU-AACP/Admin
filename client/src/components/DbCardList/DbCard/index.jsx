import React, { useState, useEffect } from "react";
import cx from "classnames";
import http from "../../../common/http";
import "./style.scss";

export default function DataBase({ database, id, remove }) {
  return (
    <div className="cardBox">
      <div className="dropBox">
        <div className="drop" onClick={() => remove(id)} aria-hidden="true" />
        <p className="dropText">삭제</p>
        <p className="dbText">DB</p>
      </div>
      <span className="cardText">{database}</span>
    </div>
  );
}
