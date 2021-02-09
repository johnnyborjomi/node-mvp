import React, {useState} from 'react';

export default () => {

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submin');
        const res = await fetch('/admin-app/login', {
            method: 'POST',
            body: JSON.stringify({
                login,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': window.csrf
            }
        });
        const data = await res.json();
        console.log('res', data);
    }

    return (
        <div>
            <h1 className="center-align">Admin Login</h1>

            <form className="login-form" onSubmit={submitHandler}>
                
                <div className="input-field">
                    <input 
                        placeholder="Login" 
                        onChange={(e) => setLogin(e.target.value)} 
                        type="text" 
                        required 
                        className="validate" 
                    />
                    <label htmlFor="title">Login</label>
                    <span className="helper-text" data-error="Fill Login"></span>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        required 
                        className="validate" 
                    />
                    <label htmlFor="title">Password</label>
                    <span className="helper-text" data-error="Fill Password"></span>
                </div>

                {/* {{#if error}} */}
                    {/* <p className="form-message alert">{{error}}</p> */}
                {/* {{/if}} */}

                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}