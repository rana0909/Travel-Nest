import "./App.css";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import ListingDetails from "./Components/ListingDetails";
import { AuthProvider } from "./store/AuthContext";
import ListingsContextProvider from "./store/ListingsContext";
import AddListing from "./Components/AddListing";

function App() {
  return (
    <>
      <AuthProvider>
        <ListingsContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
          </Routes>
        </ListingsContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
