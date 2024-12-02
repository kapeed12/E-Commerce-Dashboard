import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Private/>}>
        <Route path='/' element={<Products/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>Logout Component.</h1>}/>
        <Route path='/profile' element={<h1>Profile Component.</h1>}/> 
         </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      
    </div>
  );
}

export default App;
