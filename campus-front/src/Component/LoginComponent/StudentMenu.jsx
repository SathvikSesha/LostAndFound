// import React, { useState } from "react";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import {
//   FaBoxOpen,
//   FaSearch,
//   FaPlusCircle,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import "../../Dashboard.css";

// const StudentMenu = () => {
//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <Navbar expand="lg" className="glass-navbar px-4 py-2">
//         <Navbar.Brand className="portal-title">
//           <FaBoxOpen className="me-2" /> Lost & Found Student Portal
//         </Navbar.Brand>
//         <Nav className="ms-auto">
//           <NavDropdown title="Items" className="nav-item">
//             <NavDropdown.Item href="/lostSubmit">
//               Lost Item Registration
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/foundSubmit">
//               Found Item Submission
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/myLostItems">
//               My Lost Items
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/myFoundItems">
//               My Found Items
//             </NavDropdown.Item>
//           </NavDropdown>

//           <Nav.Link href="/" className="logout-btn">
//             <FaSignOutAlt className="me-1" /> Logout
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       {/* Dashboard Cards */}
//       <div className="cards-grid">
//         <motion.div
//           className="stat-card"
//           whileHover={{ scale: 1.05 }}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <FaPlusCircle className="card-icon" />
//           <h4>Lost Item Registration</h4>
//           <p>Report your lost item</p>
//         </motion.div>

//         <motion.div
//           className="stat-card"
//           whileHover={{ scale: 1.05 }}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <FaBoxOpen className="card-icon" />
//           <h4>Found Item Submission</h4>
//           <p>Submit items you found</p>
//         </motion.div>

//         <motion.div
//           className="stat-card"
//           whileHover={{ scale: 1.05 }}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <FaSearch className="card-icon" />
//           <h4>Lost Item Track</h4>
//           <p>Track your lost items</p>
//         </motion.div>
//       </div>

//       {/* Welcome Box */}
//       <motion.div
//         className="welcome-card"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.6 }}
//       >
//         <h3>Welcome to Student Dashboard</h3>
//         <p>
//           Register lost items, submit found items, and track your belongings
//           easily.
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default StudentMenu;

import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaSearch,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser,
  FaFileAlt,
  FaMapMarkerAlt,
  FaBell,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../../Dashboard.css";

const StudentMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (title) =>
    setOpenDropdown(openDropdown === title ? null : title);

  // MENU ITEMS MAPPING
  const menuItems = [
    {
      title: "Profile",
      icon: <FaUser className="me-2" />,
      items: [{ name: "Personal Info", href: "/Personal", icon: <FaUser /> }],
    },
    {
      title: "Items",
      icon: <FaBoxOpen className="me-2" />,
      items: [
        {
          name: "Lost Item Registration",
          href: "/LostSubmit",
          icon: <FaMapMarkerAlt />,
        },
        {
          name: "Found Item Submission",
          href: "/FoundSubmit",
          icon: <FaMapMarkerAlt />,
        },
        { name: "My Lost Items", href: "/MyLostItems", icon: <FaFileAlt /> },
        { name: "My Found Items", href: "/MyFoundItems", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Reports",
      icon: <FaFileAlt className="me-2" />,
      items: [
        { name: "Lost Item List", href: "/LostReport", icon: <FaFileAlt /> },
        { name: "Found Item List", href: "/FoundReport", icon: <FaFileAlt /> },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      {/* NAVBAR */}
      <Navbar expand="lg" className="glass-navbar px-4 py-2">
        <Navbar.Brand className="portal-title d-flex align-items-center">
          <FaBoxOpen className="me-2" /> Lost & Found Student Portal
        </Navbar.Brand>

        {/* MOBILE TOGGLE */}
        <button
          className="menu-toggle d-lg-none border-0 bg-transparent text-white fs-4"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Nav className="ms-auto d-none d-lg-flex align-items-center">
          {menuItems.map((menu, index) => (
            <div key={index} className="position-relative me-3">
              <button
                className="btn btn-link text-white text-decoration-none dropdown-toggle"
                onClick={() => toggleDropdown(menu.title)}
              >
                {menu.icon}
                {menu.title}
              </button>

              {openDropdown === menu.title && (
                <div className="dropdown-menu show fade-in glass-dropdown">
                  {menu.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <span className="me-2">{item.icon}</span> {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <FaBell className="text-white me-3 fs-5" />
          <FaCog className="text-white me-3 fs-5" />

          <Link to="/" className="logout-btn d-flex align-items-center">
            <FaSignOutAlt className="me-1" /> Logout
          </Link>
        </Nav>
      </Navbar>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="mobile-menu glass-dropdown mt-2 p-3 rounded">
          {menuItems.map((menu, idx) => (
            <div key={idx} className="mb-3">
              <button
                onClick={() => toggleDropdown(menu.title)}
                className="w-100 text-start btn btn-outline-light mb-1"
              >
                {menu.icon} {menu.title}
              </button>
              {openDropdown === menu.title && (
                <div className="ms-3">
                  {menu.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="d-block text-white-50 mb-1"
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/" className="btn btn-danger w-100">
            <FaSignOutAlt className="me-2" /> Logout
          </Link>
        </div>
      )}

      {/* DASHBOARD CARDS */}
      <div className="cards-grid">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaPlusCircle className="card-icon" />
          <h4>Lost Item Registration</h4>
          <p>Report your lost item</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaBoxOpen className="card-icon" />
          <h4>Found Item Submission</h4>
          <p>Submit items you found</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaSearch className="card-icon" />
          <h4>Lost Item Track</h4>
          <p>Track your lost items</p>
        </motion.div>
      </div>

      {/* WELCOME CARD */}
      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3>Welcome to Student Dashboard</h3>
        <p>
          Register lost items, submit found items, and track your belongings
          easily.
        </p>
      </motion.div>
    </div>
  );
};

export default StudentMenu;
