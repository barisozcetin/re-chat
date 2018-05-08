import React from "react";

const Login = props => {
  return (
    <div className="login">
      <p>Login</p>
      <button onClick={() => props.authenticate("Email")}>With E-mail</button>
      <button onClick={() => props.authenticate("Google")}>With google</button>
      <button onClick={() => props.authenticate("Phone")}>
        With Phone number
      </button>
    </div>
  );
};

export default Login;
