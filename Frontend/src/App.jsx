import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import Addproduct from "./components/Addproduct";
import Productlist from "./components/Productlist";
import Updateproduct from "./components/Updateproduct";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<Productlist />} />
              <Route path="/add" element={<Addproduct />} />
              <Route path="/update/:id" element={<Updateproduct />} />
              <Route path="/logout" element={<h1>Logout component</h1>} />
              <Route path="/profile" element={<h1>Profile component</h1>} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
