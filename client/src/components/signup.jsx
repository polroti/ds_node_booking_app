import React, { Component } from "react";
import "../App";
import SignIn from './signin';
import ReactDOM from 'react-dom';


class Signup extends Component{
    constructor(props){
        super(props);
    }

    signUp(){
        const email=this.refs.email.value;
        const password=this.refs.password.value;
        const password2=this.refs.password2.value;
        const nic=this.refs.nic.value;


        var checkEmail=false;
        fetch('http://localhost:5000/users/'+email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            return res.json();
          
        }).then(result=>{
            const user=JSON.stringify(result);
            console.log(user);
            if(user!='[]'){
                alert('The email,'+ result.email+'is already attached to an account');
            }else{
                var userData={
                    "email":email,
                    "password":password,
                    "password2":password2,
                    "nic":nic
                };
                console.log(userData);

                //post it - AKA - Signup
                fetch('http://localhost:5000/users',{
                    method:'POST',
                    body:userData,
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then(res=>{
                    return res.json();
                }).then(result=>{
                    alert('Welcome! You have successfully signed in');
                   // ReactDOM.render(<SignIn/>,document.getElementById('root'));
                }).catch(err=>{
                    alert("Error : " +err);
                })
            }
        }).catch(err=>{
            alert("Error : " +err);
        })
    }
    
    signIn(){
        ReactDOM.render(<SignIn/>,document.getElementById('root'));
    }

    render(){
        return(
            <div className="container">
                <div className="backimg">
                    <div className="paddinglog">
                        <div class="progress">
                            <div class="progress-bar bar1" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div class="progress-bar bg-success bar2" role="progressbar" aria-valuenow="30" aria-valuemin="0" ariavaluemax="100">
                            </div>
                            <div class="progress-bar bg-info bar3" role="progressbar" aria-valuenow="20" aria-valuemin="0" ariavaluemax="100">
                            </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <form className="paddingsub">
                                        <fieldset>
                                            <legend>Online Train Ticket Booking</legend>
                                                <h3>Sign Up</h3>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email" ref="email"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">NIC</label>
                                                        <input className="form-control" id="exampleInputPassword1" placeholder="NIC" type="text" ref="nic"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Password</label>
                                                        <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" ref="password"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                                        <input className="form-control"id="exampleInputPassword1" placeholder="Password" type="password"ref="password2"/>
                                                    </div>
                                                     
                                                <button type="button" className="btn btnprimary" onClick={()=>{this.signUp()}}>Submit</button>
                                        </fieldset>
                                    </form>
                               </div>
                               <div className="col-md-5">
                                    <div>
                                        <button type="submit" className="btn btnprimary" onClick={()=>{this.login()}}>Login</button>
                                    </div>
                               </div>
                             </div>
                        </div>
                    </div>
        )
    }
}


export default Signup;





