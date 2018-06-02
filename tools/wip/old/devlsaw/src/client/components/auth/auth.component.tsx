import * as React from 'react';
import  GoogleLogin  from 'react-google-login';


 const AuthComponent = ({guestMode,responseGoogle,errorGoogle}) => (
    <div>
        <div className="d-flex justify-content-center">
            <h3>Sign up with Google</h3>
        </div>
        <div className="d-flex justify-content-center">
            <GoogleLogin
                clientId="1024119130296-irvqq00o7qspf8d4f7vg8luueh7idjvg.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={errorGoogle}
                className="authBtn"
                scope="https://www.googleapis.com/auth/userinfo.profile"
                responseType="code"
            />
        </div>
        <div className="guestMode">
            or
            <button className="btn guestBtn" onClick={guestMode}>Use app as guest</button>
        </div>
    </div>
);


export default AuthComponent