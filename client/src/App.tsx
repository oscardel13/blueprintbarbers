import { Routes, Route } from 'react-router-dom';

import Landing from './router/landing/landing.route';
import Navigation from './router/navigation/navigation.route';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Landing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
