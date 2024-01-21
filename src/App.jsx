import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";

//علشان حنستخدمها  useConext hook  بستدعى
import { useContext } from "react";
//بستدعى الملف الذى يحتوى على الداتا
import DataContext from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>SORROY.........</h1>,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/Profile",
    element: <Profile />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  const { theme } = useContext(DataContext);
  return (
    <div className={theme}>
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
