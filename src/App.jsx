import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";

//علشان حنستخدمها  useConext hook  بستدعى
import { useContext } from "react";
//بستدعى الملف الذى يحتوى على الداتا
import DataContext from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditeTask from "./pages/Edite-Task/EditeTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
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

  {
    path: "/editepage",
    element: <EditeTask />,
  },
]);

function App() {
  const { theme } = useContext(DataContext);
  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
