import React from "react";
import "../Stylesheets/Loader.css"

export default function Loader() {
  return (
    <div className="AdminLoadercon">
      <img src="https://i.gifer.com/70bm.gif" alt="" className="AdminLoader" />
      <span className="AdminLoaderText">
        AlgoFusion's Page is Loading...
      </span>
    </div>
  );
}
