import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Signup from './Components/Signup';

import Home from './Components/Home';
import Login from './Components/Login';
import AddBlog from './Components/Createblog';
import View from './Components/Viewblog';
import Email from './Forgot/Email';
import OTP from './Forgot/Otp';
import Resetpass from './Forgot/resetpassword'








export default function App(){
    return(
      
        <BrowserRouter>
       
        <Routes>
    
        
       <Route path='/' element={<Home />}></Route>
       <Route path='/login' element={<Login /> }></Route>
       <Route path='/signup' element={<Signup />}></Route>
       <Route path='/blog' element={<AddBlog />}></Route>
       <Route path='/view' element={<View />}></Route>
       <Route path='/email' element={<Email />}></Route>
       <Route path='/otp' element={<OTP />}></Route>
       <Route path='/reset' element={<Resetpass />}></Route>

      







      

        </Routes>
        
        </BrowserRouter>
    
    )
}