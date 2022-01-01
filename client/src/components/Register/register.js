import React, { useState } from "react";
import axios from "axios";
const url = "https://gautam-memeories-app.herokuapp.com/users/signup";
function Register() {

 const [formdata,setformdata] = useState({
	 name : "",
	 email : "",
	 password: "",
     confirmPassword: ""
 })
function handleChange(event)
{
   const {name,value} = event.target;
   setformdata(prevValue =>
	{
		return ({
			...prevValue,[name]:value
		})
	})
}
async function handleSubmit(event)
{
	try {
		event.preventDefault();
		const result = await axios.post(url,formdata);
		if(result.status === 202)
		{
			alert("User Already Exists");
		}
		else{
			localStorage.setItem("mytoken",result.data.token);
			localStorage.setItem("myname",result.data.result.name);
			alert("Registered Successfully");
			window.location.href = '/home';
			setformdata(
				{
					name : "",
					email : "",
					password: "",
					confirmPassword: ""
				})
		}
	} catch (error) {
		alert("Password do not Match");
	}
}




  return (
    <body className="authenticaton">  
		<form   className="login-form"  action="#">
		    <h4>MEMORIES APP</h4> 
			<h1>Create Account</h1>
			<div className="social-container">
				<a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input className="forminput" type="text" placeholder="Name" name="name" value = {formdata.name} onChange={handleChange}   />
			<input className="forminput" type="email" placeholder="Email" name="email" value = {formdata.email} onChange={handleChange} />
			<input className="forminput" type="password" placeholder="Password" name="password" value = {formdata.password} onChange={handleChange} />
			<input className="forminput" type="password" placeholder="Confirm Password" name="confirmPassword" value = {formdata.confirmPassword} onChange={handleChange} />
			<button className = "btn" type="submit" onClick={handleSubmit}>Sign Up</button>
			<a href="/"  className="link">Already have account? Sign In</a>
		</form>
    </body>
  );
}

export default Register;
