import React, { useContext } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import "./App.css"
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AboutCompanyPage from './pages/AboutCompanyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogCreatePage from './pages/BlogCreatePage';
import { AuthContext } from './context/authContext';
import UserBlogs from './pages/UserBlogs';
import BlogEditPage from './pages/BlogEditPage';




const Layout = () => {
  return(
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}


const ProtectedRoute = ({ children }) => {
  const {currentUser} = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/girisyap" />; 
  }

  return children; 
};


const HasUserRoute = ({ children }) => {
  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Navigate to="/" />; 
  }

  return children; 
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/blog/:idblog",
        element: <BlogPage />
      },
      {
        path: "/kategori/:categoryName",
        element: <CategoryPage />
      },
      {
        path: "/ara",
        element: <SearchPage />
      },
      {
        path: "/iletisim",
        element: <ContactPage />
      },
      {
        path: "/sirkethakkinda",
        element: <AboutCompanyPage />
      }
      ,
      {
        path: "/yeniblogekle",
        element: (
          <ProtectedRoute>
            <BlogCreatePage />
          </ProtectedRoute>
        )
      }
      ,
      {
        path: "/profil",
        element: (
          <ProtectedRoute>
            <UserBlogs />
          </ProtectedRoute>
        )
      }
      ,
      {
        path: "/blogdüzenle",
        element: (
          <ProtectedRoute>
            <BlogEditPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    path: "/girisyap",
    element: (
      <HasUserRoute>
        <LoginPage />
      </HasUserRoute>
    )
  },
  {
    path: "/kayitol",
    element: (
      <HasUserRoute>
        <RegisterPage />
      </HasUserRoute>
    )
  }
]);

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
