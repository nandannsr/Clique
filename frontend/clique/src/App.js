import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Welcome,
  UploadPage,
  UserVideo,
} from './pages/user/index'
import PrivateRoutes from "./routes/PrivateRoutes";







function App() {
  return (
    
    <Router>
      
      <Routes>
        <Route element={<PrivateRoutes />}>
           <Route element={<Home />} path="/home" exact/>

        </Route>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/upload" element={<UploadPage />}></Route>
        <Route path="/playing" element={<UserVideo />}></Route>
        

        

      </Routes>
    </Router>


  );
}

export default App;
