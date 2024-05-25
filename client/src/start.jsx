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
import Alumni from "./pages/EventPage.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/Theme/ThemeProvider.jsx";
import Private_Route from "./components/PrivateRoute/Private_Route.jsx";
import Store from "./pages/Store.jsx";
import Events from "./pages/Event.jsx";


import Blog from "./pages/Blog.jsx";
import TokenRefresher from "./TokenRefresher.js";
import BlogSlug from "./pages/BlogSlug.jsx";
import Search from "./pages/Search.jsx";
import EventPage from "./pages/EventPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsCondition.jsx";
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
        path:"/events/:eventSlug",
        element:<EventPage/>
      },
      {
        path:"/privacyPolicy",
        element:<PrivacyPolicy/>
      },
      {
        path:"/termsCondition",
        element:<TermsAndConditions/>
      },
      {
        path: "/events",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Events />,
          },
        ],
      },
      
      {
        path: "/store",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Store />,
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
