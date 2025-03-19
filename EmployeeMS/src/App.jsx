import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminLogin from './Components/AdminLogin';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDashboard from './Components/employee/EmployeeDashboard';
import EmployeeHome from './Components/employee/EmployeeHome';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/start' element={<Start/>}></Route>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/employeelogin" element={<EmployeeLogin />} />
      <Route path='/dashboard' element={<Dashboard/>}>
         <Route path='' element={<Home/>}></Route>
         <Route path='employee' element={<Employee/>}></Route>
         <Route path='category' element={<Category/>}></Route>
         <Route path='profile' element={<Profile/>}></Route>
         <Route path='add_category' element={<AddCategory/>}></Route>
         <Route path='add_employee' element={<AddEmployee/>}></Route>
         <Route path='edit_employee/:id' element={<EditEmployee/>}></Route>
      </Route>
      <Route path='/employeedashboard' element={<EmployeeDashboard/>}>
          <Route path='' element={<EmployeeHome/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
