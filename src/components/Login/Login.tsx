import Joi from 'joi';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../services/user';
import { setToken } from '../../utils/localStorage.util';
import styles from "./login.module.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handlePasswordVisible = () => { setIsPasswordVisible(!isPasswordVisible)}

  const submitLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const schema = Joi.object({
      userName: Joi.string().min(3).required(),
      password: Joi.string().min(6).required()
    });

    const { error } = schema.validate({ userName, password });

    if (error) {
      console.log(error);
      return;
    }

    const { data: { token } } = await login({ userName, password });

    setToken(token);
    setTimeout(() => { navigate('/') }, 500);
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_form}>
        <h1>Login</h1>

        <label htmlFor="userName" className={styles.label}>
          <input
            type="text"
            name="userName"
            placeholder='Login'
            className={styles.input}
            onChange={updateUserName}
          />
        </label>

        <label htmlFor="password" className={styles.label}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            id='password'
            placeholder='Password'
            className={styles.input}
            onChange={updatePassword}
          />
          {isPasswordVisible ? (
            <FaEyeSlash onClick={handlePasswordVisible} />
          ) : (
            <FaEye onClick={handlePasswordVisible} />
          )}
        </label>

        <button
          type='button'
          className={styles.button}
          onClick={submitLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
