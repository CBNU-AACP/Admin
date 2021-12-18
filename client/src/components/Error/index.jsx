import React, { useContext, useState, useEffect, useRef } from "react";
import "./style.scss";

export default function Error({ message, error }) {
  return (
    <div className="errorBox">
      <div className="message">{message}</div>
      <div className="error">{error}</div>
    </div>
  );
}
