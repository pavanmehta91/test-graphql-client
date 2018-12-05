import React, { Fragment } from "react";

export default () => (
  <div className="loader">
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <div className="overlay-mask" />
  </div>
);
