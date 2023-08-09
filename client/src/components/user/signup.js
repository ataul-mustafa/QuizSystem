import React, { useEffect, useState, useLayoutEffect } from 'react'
import '../../styles/sign.css';
import { Link } from 'react-router-dom';
import { signUp } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CLEAR_SIGN_MSGS_ERR } from '../../redux/reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../redux/actions/userActions';
// import avtr from '@/images/profile-image.png'
// import Image from 'next/image';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, isAuthenticated } = useSelector((state) => state.userData);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    class: null,
  })

  const [disable, setDisable] = useState(true);
  const submitSignUp = async () => {
    try {
      const myPromise = dispatch(signUp(user));
      toast.promise(myPromise, {
        loading: 'Loading...',
        success: 'Loaded',
        error: 'Error while login',
      });
    } catch (error) {
      toast.error(error.message);
      dispatch(CLEAR_SIGN_MSGS_ERR());
    }
  }

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (message !== "") {
      toast.success(message);
      dispatch(CLEAR_SIGN_MSGS_ERR());
    }
    if (error !== "") {
      toast.error(error);
      dispatch(CLEAR_SIGN_MSGS_ERR());
    }
    if (isAuthenticated) {
      navigate("/");
    }

  }, [user, message, error, isAuthenticated, loading, dispatch, navigate])

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser())
    }
  }, [])

  return (
    <div className='authBox'>
      {/* {
        loading && <h2>Loading...</h2>
      } */}
      <Link className='back' to={'/'}>Back</Link>
      <div className='logSignForm'>
        <h1>Create Account</h1>
        <div className='inputBox'>
          <label htmlFor="username">User Name </label>
          <input id="username" type='text' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='Username' required />
        </div>

        <div className='inputBox'>
          <label htmlFor="email">Email </label>
          <input id="email" type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' required />
        </div>

        <div className='inputBox'>
          <label htmlFor="password">Password </label>
          <input id="password" type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' required />
        </div>

        <div className='inputBox'>
          <label htmlFor="class">Class </label>
          <input id="class" max={12} min={1} type='number' value={user.class} onChange={(e) => setUser({ ...user, class: e.target.value })} placeholder='Class' />
        </div>

        <button className='submitBtn' disabled={disable || loading} onClick={submitSignUp}>Sign Up</button>
        <p className='orInfo'>OR</p>
        <Link className='loginBtn' to={'/login'}>Already Signup? Login</Link>
      </div>

    </div>
  )
}

export default SignUp;