// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { validateUser } from "../../Services/LoginService";
// import { FaUser, FaLock } from "react-icons/fa";
// import "../../LoginView.css";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   let navigate = useNavigate();

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const checkLogin = (e) => {
//     e.preventDefault();
//     validateUser(formData.username, formData.password).then((response) => {
//       let role = String(response.data);
//       if (role === "Admin") navigate("/AdminMenu");
//       else if (role === "Student") navigate("/StudentMenu");
//       else alert("Wrong Userid/Password");
//     });
//   };

//   const handleValidation = (e) => {
//     e.preventDefault();
//     let tempErrors = {};
//     let isValid = true;

//     if (!formData.username.trim()) {
//       tempErrors.username = "User Name is required";
//       isValid = false;
//     }
//     if (!formData.password.trim()) {
//       tempErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(tempErrors);
//     if (isValid) checkLogin(e);
//   };

//   return (
//     <div className="loginpage d-flex justify-content-center align-items-center">
//       <div className="home-link" onClick={() => navigate("/")}>
//         ← Home
//       </div>
//       <div className="bg-shapes" aria-hidden="true">
//         <div className="shape shape-1" />
//         <div className="shape shape-2" />
//         <div className="shape shape-3" />
//         <div className="shape shape-4" />
//       </div>
//       <div className="glass-card p-5">
//         <h2 className="text-center mb-2">Welcome Back</h2>
//         <p className="text-center tagline">Access the Lost & Found Portal</p>

//         <form onSubmit={handleValidation}>
//           <div className="form-group">
//             <div className={`icon-input ${errors.username ? "has-error" : ""}`}>
//               <FaUser className="input-icon" />
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={onChangeHandler}
//                 className="form-control"
//               />
//             </div>
//             {errors.username && <p className="error-msg">{errors.username}</p>}
//           </div>

//           <div className="form-group">
//             <div className={`icon-input ${errors.password ? "has-error" : ""}`}>
//               <FaLock className="input-icon" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={onChangeHandler}
//                 className="form-control"
//               />
//             </div>
//             {errors.password && <p className="error-msg">{errors.password}</p>}
//           </div>

//           <button type="submit" className="btn btn-gradient-primary w-100 mt-3">
//             Login →
//           </button>
//         </form>

//         <p className="bottom-link text-center mt-3">
//           First time to this page?{" "}
//           <a onClick={() => navigate("/Register")}>Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import { FaUser, FaLock } from "react-icons/fa";
import "../../LoginView.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await validateUser(formData.username, formData.password);
      let role = String(response.data);

      if (role === "Admin" || role === "Student") {
        // ✅ Store credentials only in *sessionStorage* (per tab)
        sessionStorage.setItem("username", formData.username);
        sessionStorage.setItem("role", role);

        if (role === "Admin") navigate("/AdminMenu");
        else navigate("/StudentMenu");
      } else {
        alert("Wrong User ID or Password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong while logging in.");
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) checkLogin(e);
  };

  return (
    <div className="loginpage d-flex justify-content-center align-items-center">
      <div className="home-link" onClick={() => navigate("/")}>
        ← Home
      </div>
      <div className="bg-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>
      <div className="glass-card p-5">
        <h2 className="text-center mb-2">Welcome Back</h2>
        <p className="text-center tagline">Access the Lost & Found Portal</p>

        <form onSubmit={handleValidation}>
          <div className="form-group">
            <div className={`icon-input ${errors.username ? "has-error" : ""}`}>
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
            {errors.username && <p className="error-msg">{errors.username}</p>}
          </div>

          <div className="form-group">
            <div className={`icon-input ${errors.password ? "has-error" : ""}`}>
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-gradient-primary w-100 mt-3">
            Login →
          </button>
        </form>

        <p className="bottom-link text-center mt-3">
          First time to this page?{" "}
          <a onClick={() => navigate("/Register")}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
