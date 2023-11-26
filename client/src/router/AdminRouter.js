import React from "react";
import { Routes, Route } from "react-router-dom";
import { map } from "lodash";
import {
  Auth,
  Users,
  User,
} from "../pages/admin";
import { AdminLayout } from "../layouts";
import { ClientLayout } from "../layouts";
import { useAuth } from "../hooks";
export const AdminRouter = () => {
  console.log(useAuth());
  const {user} = useAuth();
  const paths = ["/admin", "/admin/home"];
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <div className="Menu">
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth/>} />
      ) : (
        <>
          {map(paths, (path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Auth)}
            />
          ))}
          <Route path="/admin/login" element={loadLayout( Auth)} />
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/user" element={loadLayout(ClientLayout, User)} />
        </>
      )}
    </Routes>
    </div>
  );
};
