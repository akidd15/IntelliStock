import React, { useState } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { LoginForm } from './loginform';
import { SignUpForm } from './signupform';
import IconLogo from '../assets/images/intelliStock_logo.png';

export default function Landing() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const handleCancelSignUp = () => {
    setShowSignUpForm(false);
  };

  return (
    <>
    <Grid
      style={{ textAlign: "center",
      height: 'auto',
       
      color: 'white',
      margin: 0, 
      padding: 0, 
      overflow: 'hidden',
      // marginBottom: '-4px' 
      }}
      verticalAlign='middle'
      stackable
    >
      {/* <Grid.Row style={{ height: '100%' }}> */}
        {/* Left half */}
        <Grid.Column 
          width={16}
          mobile={16}
          tablet={8}
          computer={8} 
          style={{
            height: 'auto',
            display: 'flex',
            paddingLeft: '25px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #1d2b38, #2c3e50)', // Adjust the color values
          }}>
          <img 
            src={IconLogo} 
            alt='IntelliStock icon logo' 
            style={{ 
              marginBottom: '-50px', 
              maxHeight: '550px', 
              maxWidth: '550px',
              width: '100%',
              height: 'auto' 
              }}>

          </img>
          <h1 style={{ marginBottom:'30px', fontSize: '40px' }}>Welcome to IntelliStock</h1>
          <p style={{ color: 'white', fontSize: '15px', lineHeight: '2.15' }}>
            – Your Intelligent Inventory Management Solution. Streamline your inventory tracking effortlessly, ensuring precision and control over your stock. Gain insights, make informed decisions, and elevate your inventory management experience with IntelliStock. Sign up now and embrace a smarter way to manage your stock!
          </p>
        </Grid.Column>


        {/* Right half */}
        <Grid.Column
          width={16}
          mobile={16}
          tablet={8}
          computer={8} 
          style={{
            backgroundColor: '#2c3e50', // Background color
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #1d2b38, #2c3e50)', // Adjust the color values
          }}
        >
          <p style={{ fontSize: '30px' }}>Sign in to start tracking!</p>
          <Segment inverted style={{ width: '90%', padding: '20px', borderRadius: '5px' }}>
            {!showSignUpForm ? (
              <LoginForm
                
              />
            ) : (
              <SignUpForm
                
                emailError={emailError}
                passwordError={passwordError}
                handleCancelSignUp={handleCancelSignUp}
              />
            )}
            {!showSignUpForm && (
              <p style={{ marginTop: '1em', color: 'white' }}>
                <span style={{ color: 'white' }}>Don't have an account? </span>
                <span onClick={handleSignUpClick} style={{ cursor: 'pointer', color: '#3498db' }}>
                  Sign up here
                </span>
                
              </p>
              
            )}
          </Segment>
        </Grid.Column>
      {/* </Grid.Row> */}
      
    </Grid>

    {/* This div provides a buffer for footer. Do not remove */}
    <div style={{ height: '50px' }}></div>
    
    </>
  );
}

