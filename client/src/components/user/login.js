import React, { useEffect, useState, useLayoutEffect } from 'react'
import '../../styles/sign.css';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CLEAR_SIGN_MSGS_ERR } from '../../redux/reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../redux/actions/userActions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, isAuthenticated } = useSelector((state) => state.userData);
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [disable, setDisable] = useState(true);

  const submitLogin = async() => {
    try {
      const myPromise = dispatch(login(user));
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

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setDisable(false);
    }else {
      setDisable(true);
    }
    if(message != ""){
      toast.success(message);
      dispatch(CLEAR_SIGN_MSGS_ERR());
    }
    if(error != ""){
      toast.error(error);
      dispatch(CLEAR_SIGN_MSGS_ERR());
    }
    if(isAuthenticated){
      navigate('/');
    }
    
  }, [user, message, error, isAuthenticated, loading])

  useLayoutEffect(()=>{
    if(!isAuthenticated){
      dispatch(loadUser())
    }
  },[])

  return (
    <div className='authBox'>
      <div className='logSignForm'>
      <h1>Login Account</h1>
        
        <div className='inputBox'>
          <label htmlFor="email">Email </label>
          <input id="email" type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' />
        </div>

        <div className='inputBox'>
          <label htmlFor="password">Password: </label>
          <input id="password" type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' />
        </div>

        <button className='submitBtn' disabled={disable || loading} onClick={submitLogin}>Login</button>
        <p className='orInfo'>OR</p>
        <Link className='loginBtn' to={'/signup'}>New User? Signup</Link>
      </div>
    </div>
  )
}

export default Login;