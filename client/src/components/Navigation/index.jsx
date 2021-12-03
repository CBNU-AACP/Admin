import React, { useContext, useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./style.scss";
import TableMocks from "../../__mocks/TableMocks";

export default function Natigation() {
  return (
    <nav className="navigation">
      <p className="naviTitle">테이블 목록</p>
      <ul className="sideMenu">
        {TableMocks.map(table => (
          <li className="tableTitle">{table.title}</li>
        ))}
      </ul>
    </nav>
  );
}
