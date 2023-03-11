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
  UserProfilePage,
  UserProfileEdit,
  UserVideoSearch

} from './pages/user/index'
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminHome from "./components/admin/AdminHome";



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
        <Route path="/profile" element={<UserProfilePage />}></Route>
        <Route path="/edit" element={<UserProfileEdit />}></Route>
        <Route path="/playing/:videoUrl" element={<UserVideo />}></Route>
        <Route path="/search/:searchQuery" element={<UserVideoSearch />}></Route>
        <Route path="/admin" element={<AdminHome />}></Route>

        

      </Routes>
    </Router>


  );
}

export default App;
