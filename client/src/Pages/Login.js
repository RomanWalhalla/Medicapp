import { NavLink } from "react-router-dom";

// import { API_URL } from '../config';

import "../styles/Login.css"

const Login = () => {

    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState('');
    
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (sessionStorage.getItem("auth-token")) {
    //         navigate("/")
    //     }
    // }, []);
    // const login = async (e) => {
    //     e.preventDefault();
    //     const res = await fetch(`${API_URL}/api/auth/login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             // name: name,
    //             email: email,
    //             password: password,
    //         }),
    //     });
    //     const json = await res.json();
    //     if (json.authtoken) {
    //         sessionStorage.setItem('auth-token', json.authtoken);

    //         sessionStorage.setItem('email', email);
    //         navigate('/');
    //         window.location.reload()
    //     } else {
    //         if (json.errors) {
    //             for (const error of json.errors) {
    //                 alert(error.msg);
    //             }
    //         } else {
    //             alert(json.error);
    //         }
    //     }
    // };

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
                        <form
                        //  onSubmit={login} 
                         action="">
                            <div className="form_group">
                                <fieldset>
                                    <legend>Email</legend>
                                    <input type="email" name="email" id="email" 
                                    // value={email} onChange={ (e) => setEmail(e.target.value) } 
                                    className="field_for_text" required class="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                                </fieldset>
                            </div>
                            <div className="form_group">
                                <fieldset>
                                    <legend>Password</legend>
                                    <input type="password" name="password" id="password"
                                    //  value={password} onChange={ (e) => setPassword(e.target.value) } 
                                     className="field_for_text" required class="form-control" placeholder="Enter your password" aria-describedby="helpId" />
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