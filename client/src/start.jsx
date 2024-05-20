import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Alumni from "./pages/Alumni.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/Theme/ThemeProvider.jsx";
import Private_Route from "./components/PrivateRoute/Private_Route.jsx";
import Achievments from "./pages/Achievments.jsx";
import Family from "./pages/Family.jsx";


import Blog from "./pages/Blog.jsx";
import TokenRefresher from "./TokenRefresher.js";
import BlogSlug from "./pages/BlogSlug.jsx";
import Search from "./pages/Search.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/dashboard",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Blog/>,
          },
        ],
      },
      
      {
        path:"/blog/:blogSlug",
        element:<BlogSlug/>
      },

      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/alumni/:alumniSlug",
        element:<Alumni/>
      },
      {
        path: "/family",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Family />,
          },
        ],
      },
      
      {
        path: "/achievements",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Achievments />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
         
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
