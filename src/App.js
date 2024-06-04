import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AddContact from "./components/contacts/addcontact/addContact";
import ContactList from "./components/contacts/contactlist/contactList";
import EditContact from "./components/contacts/editcontact/editContact";
import ViewContact from "./components/contacts/viewcontact/viewContact";
import Navbar from "./components/navbar/navbar";
import LoginPage from "./login_page";

function App() {
  return (
    <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contact/list"} />}></Route>
        <Route path="/contact/list" element={<ContactList />}></Route>
        <Route path="/contact/add" element={<AddContact />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
        <Route
          path="/contact/edit/:contactId"
          element={<EditContact />}
        ></Route>
        <Route
          path="/contact/view/:contactId"
          element={<ViewContact />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
