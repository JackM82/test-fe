import Login from './Pages/Login';
import Home from './Pages/Home';
import UsersList from './Pages/UsersList';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PRoutes from './middleware/ProtectedRoutes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='/users' element={<UsersList/>}/>
        <Route element={<PRoutes/>}> {/*le rotte protette vanno sotto questa route*/}
          <Route path={'/home'} element={<Home/>} />
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
