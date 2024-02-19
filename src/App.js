import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/details' element={<Details/>} />

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
