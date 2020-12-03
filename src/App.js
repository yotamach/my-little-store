import React from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import AppHeader from './layout/header/header';
import AppFooter from './layout/footer/footer';
import MainContent from './layout/mainContent/mainContent';

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <AppHeader/>
        <Container>
          <MainContent/>
        </Container>
        <AppFooter/>
      </React.StrictMode>
    </div>
  );
}

export default App;
