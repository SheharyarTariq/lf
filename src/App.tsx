import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "@/lib/layout/dashboard";
import {Auth} from "@/lib/layout/auth";

import {isAuthenticated} from "@/lib/api/auth/authenticate";
import React from "react";
import SignIn from "@/pages/auth/sign-in";

function App() {
  type Props = {
    children: React.ReactNode;
  };
  const ProtectedRoute: React.FC<Props> = ({children}) => {
    if (!isAuthenticated()) {
      return <Navigate to="/auth/sign-in" replace/>;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route path="/auth/*" element={<Auth/>
      }/>

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard/area" replace/>
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<SignIn/>
      }/>
    </Routes>
  );
}

export default App;
