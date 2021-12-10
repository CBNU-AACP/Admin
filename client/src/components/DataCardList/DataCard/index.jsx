/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";
import http from "../../../common/axios";
import "./style.scss";

export default function DataCard({ isNew, data, id, remove }) {
  const schema = useSelector(state => state.table.currentSchema);

  return (
    <div className="dataCard">
      <div className="btnBox">
        <div
          className="circle drop"
          onClick={() => remove(id)}
          aria-hidden="true"
        />
        <p className="text">삭제</p>
        <p className="dataText">데이터</p>
      </div>
      <ul className="attributeList">
        {schema.map(attribute => (
          <li className="attribute">
            # {attribute}: {data[attribute]}
          </li>
        ))}
      </ul>
    </div>
  );
}
