import React, { useState } from "react";
import axios from "axios";
const url = "https://gautam-memeories-app.herokuapp.com/users/signin";
function Login() {
  const [login, setlogin] = useState({
	  email : "",
	  password : ""
  })
function handleChange(event)
{
  const {name , value} = event.target;

	  setlogin(prevValue=>
		{
           return ({
			   ...prevValue,[name] : value
		   })
		})
}
async function handleClick(event)
{
	try {
		event.preventDefault();
	    const result = 	await axios.post(url,login);
	    localStorage.setItem("mytoken",result.data.token);
		localStorage.setItem("myname",result.data.result.name);
	    window.location.href = '/home';
		setlogin({
			email : "",
			password : ""
		});
	} catch (error) {
		alert('Invalid Credintials');
	}
   }

return (
    <body className="authenticaton">  
		<form   className="login-form"  action="#">
		    <h4>MEMORIES APP</h4> 
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className ="social"><i class="fab fa-google-plus-g"></i></a>
			</div>
			<span>or use your account</span>
			<input className="forminput" type="email" name="email" placeholder="Email" onChange={handleChange} value={login.email} />
			<input className="forminput" type = "password" name="password" placeholder="Password" onChange={handleChange} value={login.password} />
			<button className = "btn" type="submit" onClick={handleClick}>Sign In</button>
			<a href="/signup"  className="link">Do not have account? Create One</a>
		</form>
    </body>
  );
}

export default Login;