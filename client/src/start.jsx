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
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Items from "./pages/Items.jsx";
import WhistList from "./pages/Whistlist.jsx";
import EventSearch from "./pages/EventSearch.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderStatus from "./pages/OrderStatus.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import VerifyEmail from "./pages/Verifyemail.jsx";
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
        path:"/eventSearch",
        element:<EventSearch/>
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
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/termsCondition",
        element:<TermsAndConditions/>
      },
      {
        path:"/verifyEmail",
        element:<VerifyEmail/>
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
      },{
        path: "/cart",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },{
        path: "/checkout/:orderId",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <Checkout />,
          },
        ],
      },{
        path: '/orderStatus',
        element:<Private_Route/>,
        children:[
          {
            index:true,
            element:<OrderStatus/>
          }
        ]
      
      },{
        path: '/orderDetails/:orderId',
        element:<Private_Route/>,
        children:[
          {
            index:true,
            element:<OrderDetails/>
          }
        ]
      
      }
      
      
      ,{
        path: "/items/:itemSlug",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: < Items/>,
          },
        ],
      },
      {
        path: "/whistList",
        element: <Private_Route />,
        children: [
          {
            index: true,
            element: <WhistList />,
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
