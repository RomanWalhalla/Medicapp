import { NavLink } from "react-router-dom";

import "../styles/Login.css"

const Login = () => {
    return (
        <>
            <div className="container_login">
                <div className="login_grid">
                    <div className="login_text">
                        <h1>Login</h1>
                    </div>
                    <div id="selected">
                    </div>
                    <div className="login_text">
                        Are you a new member? <span><NavLink to="/SignUp">Sign Up Here</NavLink></span>
                    </div>
                    <div className="login_form">
                        <form action="">
                            <div className="form_group">
                                <fieldset>
                                    <legend>Email</legend>
                                    <input type="email" className="field_for_text" required class="form-control" placeholder="Enter your email" />
                                </fieldset>
                            </div>
                            <div className="form_group">
                                <fieldset>
                                    <legend>Password</legend>
                                    <input type="text" className="field_for_text" required class="form-control" placeholder="Enter your password" />
                                </fieldset>
                            </div>
                            <div className="btn_group">
                                <button type="submit" className="btn btn_primary">Submit</button>
                                <button type="reset" className="btn btn_danger">Reset</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;