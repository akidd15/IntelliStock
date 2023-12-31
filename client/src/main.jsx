import 'semantic-ui-css/semantic.min.css';
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from './components/landing';
import Categories from './components/categories';
import Home from './components/home';
import './main.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      }, {
        path: '/categories/:categoryId',
        element: <Categories />
      }, {
        path: '/home',
        element: <Home />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
