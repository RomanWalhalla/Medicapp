import { useLocation, /* useNavigate, */ NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';

// import chalk from "chalk"
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { Context } from "../../context/Context";

import "../../styles/Auth.css"

const AuthPage = () => {
    const context = useContext(Context)
    const location = useLocation()
    const { notifySuccess, notifyError, /* notifyWarn */ } = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const { name, phone, email, password } = formData;

    const navigate = useNavigate()

    const isRegisterForm = location.pathname === "/Register"

    // Register //
    useEffect(() => {
        notifyError(error)
        clearError()
    }, [error, notifyError, clearError])
    // const [showerr, setShowerr] = useState('');
    // const navigate = useNavigate();

    const [role, setRole] = useState('')

    const changeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const registerHandler = async () => {
        try {
            await request("/api/auth/register", "POST", { ...formData })
            // const data = await request("/api/auth/register", "POST", { ...formData })
            // console.log(chalk.red("formData", JSON.stringify(formData, null, 2)))
            notifySuccess("Registration successful!")
        } catch (error) {
            notifyError("Registration failed!")
            // notifyError("Registration failed!")
            // notifyWarn("Email o Phone already in use!")
        }
    }
    // ----------------------------------------------------------------------------------------

    // Login //
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", { ...formData })
            context.login(data.userId, data.userName, data.token)
            navigate("/")
            // console.log(chalk.red("formData", <JSO></JSO>N.stringify(formData, null, 2)))
            // console.log(chalk.red("data", JSON.stringify(data, null, 2)))

            notifySuccess("Account Login successful!")
        } catch (error) {
            notifyError("Account Login failed!")
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
                                            <select id="mySelect" value={role} onChange={(e) => setRole(e.target.value)} required>
                                                <option value='' disabled>------</option>
                                                <option value="Doctor">Doctor</option>
                                                <option value="Patient">Patient</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="form-group_signup">
                                        <fieldset>
                                            <legend>Name</legend>
                                            <input
                                                type="text"
                                                name='name'
                                                id='name'
                                                value={name}
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
                                                name='phone'
                                                id='phone'
                                                value={phone}
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