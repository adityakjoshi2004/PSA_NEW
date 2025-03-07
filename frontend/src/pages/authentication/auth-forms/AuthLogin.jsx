import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

function AuthLogin({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loadGAPI = () => {
      if (window.gapi) {
        gapi.load('client:auth2', () => {
          gapi.client
            .init({
              apiKey: 'AIzaSyCRnh_T5iaKPCavpwRj-JZJExBYtQDotIg',
              clientId: '345535269501-scljiqium691v9b9kvs4tntr45boqts6.apps.googleusercontent.com',
              discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
              scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
            })
            .then(() => console.log('Google API initialized'))
            .catch((error) => console.error('Google API initialization failed:', error));
        });
      } else {
        console.error('gapi is not available.');
      }
    };

    loadGAPI();
  }, []);

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    const authToken = response.credential;
    localStorage.setItem('googleAuthToken', authToken);
  
    // Decode the Google token to get user info
    const userInfo = JSON.parse(atob(authToken.split('.')[1])); // Decoding JWT payload
    localStorage.setItem('googleUser', JSON.stringify(userInfo));
  
    navigate('/'); // Redirect user after login
    if (onLogin) onLogin(response);
  };
  

  const onFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId="345535269501-scljiqium691v9b9kvs4tntr45boqts6.apps.googleusercontent.com">
      <div className="auth-container">
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          useOneTap // Enables popup-based login instead of a new tab
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthLogin;