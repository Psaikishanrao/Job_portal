import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './componenets/AllRoutes';

function App() {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}

export default App;
