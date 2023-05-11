import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("please enter all the required fields!");
      return;
    }

    loginUser(credentials);
  };

  return (
    
    <div className="login-container" style={{ textAlign: "center" }}>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" , color:"green"}}>Login</h3>

        <div className="form-group">
          <label htmlFor="emailInput" className="form-label">
            Email 
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="seumenino@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Senha"
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3 btn-sm rounded login-btn" />
        <p>
          Não tem uma conta? <Link to="/register">Crie uma!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
