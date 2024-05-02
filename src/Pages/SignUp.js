import { NavLink } from "react-router-dom";

import "../styles/SignUp.css"

const SignUp = () => {
    return (
        <>
            <div className="container_signup">
                <div className="sign_up_grid">
                    <div className="sign_up_text">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="selected">
                    </div>
                    <div className="sign_up_text">
                        Already member? <span><NavLink to="/Login">Login</NavLink></span>
                    </div>
                    <div className="sign_up-form">
                        <form action="">
                            <div className="form-group">
                                <fieldset>
                                    <legend>Role</legend>
                                    <select id="mySelect" onchange="myFunction()">
                                        <option disabled selected>------</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Patient">Patient</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="form-group">
                                <fieldset>
                                    <legend>Name</legend>
                                    <input type="text" className="field_for_text" required class="form-control" placeholder="Enter your name" />
                                </fieldset>
                            </div>
                            <div className="form_group">
                                <fieldset>
                                    <legend>Phone</legend>
                                    <input type="tel" className="field_for_text" required class="form-control" placeholder="Enter your phone" />
                                </fieldset>
                            </div>
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

export default SignUp;