import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Politica } from "../pages/web";


export const WebRouter = () => {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page/>
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayout( Home)} />
      <Route path="/politica" element={loadLayout( Politica)} />
    </Routes>
  );
};
