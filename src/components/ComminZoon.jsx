import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ComingSoon = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'transparent',
      color: 'white',
      textAlign: 'center',
      paddingBottom: '25vh' // This will lift the content up
    }}>
      <h1 style={{ 
        fontSize: '3rem',
        marginBottom: '0.5rem', // Reduced from 2rem to 1rem
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        Coming Soon
      </h1>
      <DotLottieReact
        src="https://lottie.host/82dfa172-cfea-46cb-9f37-f5a642de0da7/3R9EmGcX2l.lottie"
        loop
        autoplay
        style={{ 
          width: "800px", 
          maxWidth: "90%", 
          height: "auto",
          marginTop: '0' // Remove any default top margin
        }}
      />
    </div>
  );
};

export default ComingSoon;