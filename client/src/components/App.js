import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react';

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import {loadUser} from '../redux/actions/userActions'
import {Toaster} from 'react-hot-toast';
import SignUp from './user/signup';
import Login from './user/login';
import Home from './Home';
import Profile from './user/profile';
import CreateQuiz from './teacher/CreateQuiz';
import ResultTable from './ResultTable';
import StudentResultTable from './teacher/getStudentResult';
import GetQuizId from './teacher/getQuizId';
import UsersList from './admin/usersList';
import MyResultTable from './user/getMyResults';
import UpdateUser from './admin/updateUser';
import NotAllowed from './NotAllowed';
import store from '../redux/store';
  
/** All routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Home />
  },
  {
    path : '/main',
    element : <Main></Main>
  },
  {
    path : '/profile',
    element : <Profile />
  },
  {
    path : '/quiz',
    element : <Quiz />
  },
  {
    path : '/result',
    element : <Result />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/createQuiz',
    element: <CreateQuiz />
  },
  {
    path: '/studentResult',
    element: <StudentResultTable />
  },
  {
    path: '/allStudentResult',
    element: <ResultTable />
  },
  {
    path: '/createdQuiz',
    element: <GetQuizId />
  },
  {
    path: '/allUsers',
    element: <UsersList />
  },
  {
    path: '/myResults',
    element: <MyResultTable />
  },
  {
    path: '/admin/editUser/:id',
    element: <UpdateUser />
  },
])


function App() {
  const { user } = useSelector((state)=>state.userData.user);

  useLayoutEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <div className='App'>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' reverseOrder={false} />

    </div>
  );
}

export default App;




// const student = () => {
//   if(role !== ""){
//    return role == "studnet"
//   } else {
//    setRole(user.role);
//   }
// }


