import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Component/LoginComponent/LoginPage";
import RegisterUser from "./Component/LoginComponent/RegisterUser";
import AdminMenu from "./Component/LoginComponent/AdminMenu";
import StudentMenu from "./Component/LoginComponent/StudentMenu";
import LostItemSubmit from "./Component/ItemComponent/LostItemSubmit";
import FoundItemSubmit from "./Component/ItemComponent/FoundItemSubmit";
import LostItemReport from "./Component/ItemComponent/LostItemReport";
import FoundItemReport from "./Component/ItemComponent/FoundItemReport";
import SingleStudentDetails from "./Component/LoginComponent/SingleStudentDetails";
import StudentList from "./Component/LoginComponent/SingleStudentDetails";
import FoundItemRedirected from "./Component/ItemComponent/FoundItemRedirected";
import Personal from "./Component/LoginComponent/Personal";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterUser />} />

            <Route path="/AdminMenu" element={<AdminMenu />} />
            <Route path="/StudentMenu" element={<StudentMenu />} />

            <Route
              path="/SingleStudentDetail"
              element={<SingleStudentDetails />}
            />
            <Route path="/Students" element={<StudentList />} />

            <Route path="/lostSubmit" element={<LostItemSubmit />}></Route>
            <Route path="/lostReport" element={<LostItemReport />}></Route>

            <Route path="/foundsubmit" element={<FoundItemSubmit />}></Route>
            <Route path="/foundreport" element={<FoundItemReport />}></Route>
            <Route
              path="/Found-Redirected/:id"
              element={<FoundItemRedirected />}
            />
            <Route path="/Personal" element={<Personal />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
