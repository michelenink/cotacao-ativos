import { JSX, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "~/pages/Dashboard/Dashboard";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";
import { clearSession, isSessionValid } from "~/utils/session";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        clearSession();
        navigate("/login");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return isSessionValid() ? children : <Navigate to='/login' />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
