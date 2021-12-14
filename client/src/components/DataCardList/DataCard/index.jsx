/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { searchKeyPK } from "../../../utils";
import "./style.scss";

export default function DataCard({ isNew, data, clientId, add, remove }) {
  const currentSchemaData = useSelector(state => state.table.currentSchemaData);
  const { attributes, schemaKey } = currentSchemaData;
  const [msgState, setMsgState] = useState("");
  const [isAddClick, setIsAddClick] = useState(false);

  useEffect(() => {
    if (isNew && !isAddClick) {
      setMsgState("입력 중");
      return;
    }
    if (!isNew) {
      setMsgState("");
      return;
    }
    if (isAddClick && isNew) setMsgState("추가 중");
  }, [isNew, isAddClick]);

  return (
    <div className="dataCard">
      <div className="btnBox">
        {!isAddClick && (
          <>
            <div
              className="circle drop"
              onClick={() => remove(clientId, data[searchKeyPK(schemaKey)])}
              aria-hidden="true"
            />
            <p className="text">삭제</p>
          </>
        )}
        <p className="dataText">{msgState}</p>
      </div>
      {!isAddClick && isNew ? (
        <>
          <table className="attributeList">
            <tbody>
              {Object.keys(attributes).map((attribute, index) => {
                if (attribute === "createdAt" || attribute === "updatedAt")
                  return;

                return (
                  <tr key={attribute + attribute.length}>
                    <td className="attribute column">{attribute}</td>
                    <td className="attribute">
                      <input
                        className="input"
                        type="text"
                        autoFocus={index === 0}
                        placeholder={`${attribute}`}
                        onChange={e => {
                          data[attribute] = e.target.value;
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="btnBox addBox">
            <div
              className="circle add"
              onClick={() => {
                add(data);
                setIsAddClick(true);
              }}
              aria-hidden="true"
            />
            <p className="text">완료</p>
          </div>
        </>
      ) : (
        <table className="attributeList">
          <tbody>
            {Object.keys(attributes).map(attribute => (
              <tr key={attribute + attribute.length * 2}>
                <td className="attribute column">{attribute}</td>
                <td className="attribute">{data[attribute]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
