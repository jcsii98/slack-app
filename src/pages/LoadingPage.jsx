import React from 'react';
import loading from '../assets/loading.png';
import slack from '../assets/slack.png';
function LoadingPage() {
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center h-100"
        style={{
          backgroundImage: `url("${loading}"), url("${slack}")`,
          backgroundPosition: '50% 50%, 50% 3%',
          backgroundSize: '500px, 200px',
          backgroundRepeat: 'no-repeat no-repeat',
        }}
      ></div>
    </>
  );
}

export default LoadingPage;
