import { useLocation, /* useNavigate, */ NavLink, useNavigate } from "react-router-dom";
import React, { useContext, /* useEffect, */ useState } from 'react';

// import chalk from "chalk"
import { useHttp } from '../../hooks/http.hook';
import Context from "../../context/Context";

import "../../styles/Auth.css"

const AuthPage = () => {
    const { login, initialState, notifySuccess, notifyError } = useContext(Context)
    const location = useLocation()
    const { loading, request, /* error, clearError */ } = useHttp()
    const [formDataR, setFormDataR] = useState(initialState)
    const { role, firstName, phoneNumber, email, password } = formDataR;
    const navigate = useNavigate()
    const isRegisterForm = location.pathname === "/register"

    // console.log("formDataR", formDataR);


    // console.log("formDataR", formDataR);


    // Register //
    // useEffect(() => {
    //     notifyError(error)
    //     clearError()
    // }, [error, notifyError, clearError])
    // const [showerr, setShowerr] = useState('');
    // const navigate = useNavigate();

    // const [role, setRole] = useState('')

    const changeHandler = (e) => setFormDataR({ ...formDataR, [e.target.name]: e.target.value });

    const registerHandler = async () => {
        try {
            const response = await request("/api/auth/register", "POST", { ...formDataR })
            // const data = await request("/api/auth/register", "POST", { ...formData })
            // console.log(chalk.red("formData", JSON.stringify(formData, null, 2)))
            notifySuccess(response)
            notifySuccess("Registration successful!")
            navigate("/")
        } catch (error) {
            notifyError(error)
            notifyError("Registration failed!")
            notifyError(error.response.data.message)
            // notifyError("Registration failed!")
            // notifyWarn("Email o Phone already in use!")
        }
    }
    // ----------------------------------------------------------------------------------------

    // Login //
    const loginHandler = async () => {
        try {
            const response = await request("/api/auth/login", "POST", { ...formDataR })
            login(response)
            // console.log(chalk.red("formData", <JSO></JSO>N.stringify(formData, null, 2)))
            // console.log(chalk.red("data", JSON.stringify(data, null, 2)))
            notifySuccess("Account Login successful!")
            navigate("/")
        } catch (error) {
            // notifyError(error)
            notifyError("Account Login failed!")
            // notifyError(error.response.data.message)
            // notifyWarn("Email o Password is not correct!")
        }
    }

    // -------------------------------------------------------------------------------------------

    return (
        <div>
            {isRegisterForm ? (
                <div>
                    <div className="container_signup">
                        <div className="sign_up_grid">
                            <div className="sign_up_text">
                                <h1 className="h1_register">Sign Up</h1>
                            </div>
                            <div className="selected_div">{role ? (<>You register as <span className="role_register" > {role} </span></>) : ''} </div>
                            <div className="sign_up_text">
                                Already member? <span><NavLink to="/Login">Login</NavLink></span>
                            </div>
                            <div className="sign_up-form">
                                <form action="" onSubmit={e => e.preventDefault()}>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Role</legend>
                                            <select
                                                id="role"
                                                name="role"
                                                value={role}
                                                onChange={changeHandler}
                                                required>
                                                <option value='' disabled>------</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="patient">Patient</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Name</legend>
                                            <input
                                                type="text"
                                                name='firstName'
                                                id='firstName'
                                                value={firstName}
                                                onChange={changeHandler}
                                                className="form-control_register"
                                                required
                                                placeholder="Enter your name"
                                                aria-describedby='helpId' />
                                        </fieldset>
                                    </div>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Phone</legend>
                                            <input
                                                type="tel"
                                                name='phoneNumber'
                                                id='phoneNumber'
                                                value={phoneNumber}
                                                onChange={changeHandler}
                                                className="form-control_register"
                                                required
                                                placeholder="Enter your phone"
                                                aria-describedby='helpId'
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Email</legend>
                                            <input
                                                type="email"
                                                name='email'
                                                id='email'
                                                value={email}
                                                onChange={changeHandler}
                                                className="form-control_register"
                                                required
                                                placeholder="Enter your email"
                                                aria-describedby='helpId' />
                                            {/* {showerr && <div className='err' style={{ color: 'red' }}>{showerr}</div>} */}
                                        </fieldset>
                                    </div>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Password</legend>
                                            <input
                                                type="password"
                                                name='password'
                                                id='password'
                                                value={password}
                                                onChange={changeHandler}
                                                className="form-control_register"
                                                required
                                                placeholder="Enter your password"
                                                aria-describedby='helpId' />
                                        </fieldset>
                                    </div>
                                    <div className="btn_group_signup">
                                        <button
                                            type="submit"
                                            className="btn btn_primary"
                                            onClick={registerHandler}
                                            disabled={loading}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn_danger"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
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
                                <form
                                    onSubmit={e => e.preventDefault()}
                                >
                                    <div className="form_group">
                                        <fieldset>
                                            <legend>Email</legend>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={email}
                                                onChange={changeHandler}
                                                required
                                                className="form-control_login"
                                                placeholder="Enter your email"
                                                aria-describedby="helpId" />
                                        </fieldset>
                                    </div>
                                    <div className="form_group">
                                        <fieldset>
                                            <legend>Password</legend>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={changeHandler}
                                                required
                                                className="form-control_login"
                                                placeholder="Enter your password"
                                                aria-describedby="helpId" />
                                        </fieldset>
                                    </div>
                                    <div className="btn_group">
                                        <button
                                            type="submit"
                                            className="btn btn_primary"
                                            onClick={loginHandler}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn_danger"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default AuthPage;