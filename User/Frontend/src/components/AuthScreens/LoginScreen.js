import { useContext, useState } from "react";
import axios from "axios";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const LoginScreen = () => {

  const {setActiveUser,setAuth} = useContext(AuthContext);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/login",{ username, password });
      const userData = await axios.get('/user/private');
      setActiveUser(userData.data.user);
      setAuth(true);
      

      setTimeout(() => {

        navigate("/")

      }, 1800)

    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 4500);

    }
  };

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">

        <div className="section-wrapper">

          <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a href="/register">Sign Up</a>

          </div>

          <div className="top-login-explain">
            <h2>Login to Your Account </h2>

            <p>
              Please Login Your Account, Thank You!
            </p>


          </div>


          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                tabIndex={1}
              />
              <label htmlFor="username">Username</label>

            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong character"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <button type="submit" >
              Login
            </button>

          </form>


        </div>

        

      </div>


    </div>


  );
};

export default LoginScreen;