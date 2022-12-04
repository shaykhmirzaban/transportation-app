import React from "react";
import { Outlet } from "react-router-dom";

const TransportList = () => {
  return (
    <section className="transportList">
      <Outlet />
    </section>
  );
};

export default TransportList;
