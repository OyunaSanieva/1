import React, { useEffect } from 'react';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoPage from './components/pages/TodoPage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import Root from './components/Root';
import PrivateRouter from './components/HOCs/PrivateRouter';
import { checkTokenThunk } from './redux/thunkActions/authThunkAction';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    void dispatch(checkTokenThunk());
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <h1>Oppps</h1>,
      children: [
        { path: '/', element: <TodoPage /> },
        { path: '/todos', element: <TodoPage /> },
        {
          element: <PrivateRouter isAllowed={user.status !== 'logged'} redirect="/" />,
          children: [
            { path: '/login', element: <SignInPage /> },
            { path: '/signup', element: <SignUpPage /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
