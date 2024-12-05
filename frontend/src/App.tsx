import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useRoutes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import Landing from './components/Landing';
import UserPreferences from './components/UserPreferences';
import ProfilePage from './components/ProfilePage';
import WorkoutLog from './components/WorkoutLog';

function App() {
  const routesArray = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/landing",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />
    },
    {
      path: "/log",
      element: <WorkoutLog />
    },
    {
      path: "/preferences",
      element: <UserPreferences />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
      <AuthProvider>
        {/* <Menu /> */}
        <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </AuthProvider>
  );
}

export default App;