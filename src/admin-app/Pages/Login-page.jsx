import React from 'react';

export default () => {
    return (
        <div>
            <h1 className="center-align">Admin Login</h1>

            <form action="/admin/login" method="POST" className="login-form">
                
                <div className="input-field">
                    <input placeholder="Login" name="login" id="login" type="text" required className="validate" />
                    <label for="title">Login</label>
                    <span className="helper-text" data-error="Fill Login"></span>
                </div>
                <div className="input-field">
                    <input placeholder="Password" name="password" id="password" type="password" required className="validate" />
                    <label for="title">Password</label>
                    <span className="helper-text" data-error="Fill Password"></span>
                </div>

                {/* {{#if error}} */}
                    {/* <p className="form-message alert">{{error}}</p> */}
                {/* {{/if}} */}

                <input type="hidden" name="_csrf" value="{{csrf}}" />

                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}