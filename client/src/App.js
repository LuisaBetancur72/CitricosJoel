import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";
import { AuthProvider } from "./contexts";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <AdminRouter />
        <WebRouter /> 
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
