import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategory from './Components/AddCategory';




function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
         <Route path='' element={<Home/>}></Route>
         <Route path='employee' element={<Employee/>}></Route>
         <Route path='category' element={<Category/>}></Route>
         <Route path='profile' element={<Profile/>}></Route>
         <Route path='add_category' element={<AddCategory/>}></Route>

      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
