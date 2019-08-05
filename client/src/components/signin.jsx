import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from "../App";
import SignIn from './signin';

import SignUp from "./signup";
import '../App.css';


class Login extends Component{
  
    toggle=function(e){
        const email=this.refs.email.value;
        const password=this.refs.password.value;
            
            if(email==='' || password===''){
                alert('Email or Password Empty');
            }else {
                var credentials = {
                    "email": email,
                    "password": password
                };
                var count = false;
    
                fetch('http://localhost:5000/users/login' + credentials.email + '/' + credentials.password, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }).then(response => {
                    return response.json();
                }).then(data => {
                    var user = JSON.stringify(data);
                    if (user != '[]') {
                        console.log(user);
                        count = true;
                        console.log(data);
                    
                        for(var user of data){
                            var name=user.name;
                            var points=user.loyaltypoints;
                        }
                        ReactDOM.render(<App name={name} points={points}
   email={email}/>, document.getElementById('root'));
    }
    else {
    alert("Invalid username or password");
    }
    }).catch(err => {
    alert(err);
    })
    if (count == true) {
    ReactDOM.render(<App/>, document.getElementById('root'));
    }
    else {
    ReactDOM.render(<SignIn/>, document.getElementById('root'));
    }
    }
    }
    signup(){
        ReactDOM.render(<SignUp/>, document.getElementById('root'));
        }
        render(){
            return(
            /*
            * login form
            */
            <div className="container">
            <div className="backimg">
            <div className="paddinglog">
            <div class="progress">
            <div class="progress-bar bar1" role="progressbar"
           aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar bg-success bar2"
           role="progressbar" aria-valuenow="30" aria-valuemin="0" ariavaluemax="100"></div>
            <div class="progress-bar bg-info bar3"
           role="progressbar" aria-valuenow="20" aria-valuemin="0" ariavaluemax="100"></div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-7">
            <form className="paddingsub">
            <fieldset>
            <legend>Online Food Shopping</legend>
            <div className="form-group">
            <label
           htmlFor="exampleInputEmail1">Email address</label>
            <input className="form-control"
           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
           type="email" ref="email"/>
            </div>
           <div className="form-group">
            <label
           htmlFor="exampleInputPassword1">Password</label>
            <input className="form-control"
           id="exampleInputPassword1" placeholder="Password" type="password"
           ref="password"/>
            </div>
           <button type="submit" className="btn btnprimary" onClick={()=>this.toggle()}>Submit</button>
            </fieldset>
            </form>
            </div>
           <div className="col-md-5">
            <div className={"leftpaddingsignup"}>
            <button type="submit" className="btn btnprimary" onClick={()=>{this.signup()}}>Sign Up</button>
            </div>
           
            </div>
            </div>
            </div>
           
            </div>
            )
            }
           }
           export default Login;