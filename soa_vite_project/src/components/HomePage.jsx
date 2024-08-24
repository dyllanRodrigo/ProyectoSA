import React from 'react';

const HomePage = () => {
  const nickname = localStorage.getItem('nickname');

  return (
    <div>
      <h1>Bienvenido, {nickname}!</h1>
      <p>Estamos felices de verte de nuevo.</p>
    </div>
  );
};

export default HomePage;
