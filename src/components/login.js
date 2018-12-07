import React from 'react'

const Login = (props) => {
    return(
        <div className="container">
  
            <div className="row" id="pwd-container">
                <div className="col-md-4"></div>
                
                <div className="col-md-4">
                <section className="login-form">
                    <form method="post" action="#" role="login">
                    <img src="http://i.imgur.com/RcmcLv4.png" className="img-responsive" alt="" />
                    <input type="email" name="email" placeholder="Email" required className="form-control input-lg" value="joestudent@gmail.com" />
                    <input type="password" className="form-control input-lg" id="password" placeholder="Password" required="" />
                    <div className="pwstrength_viewport_progress"></div>
                    <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Sign in</button>
                    <div>
                        <a href="#">Create account</a> or <a href="#">reset password</a>
                    </div>
                    
                    </form>
                </section>  
                </div>
            </div>
        </div>


    )
}

export default Login;