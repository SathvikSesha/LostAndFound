import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import {
  getAllFoundItems,
  getFoundItemsByUser,
} from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import "../../LostItemReport.css";

const FoundItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchData =
        currentUser.role === "Admin" ? getAllFoundItems : getFoundItemsByUser;
      fetchData()
        .then((response) => setItemList(response.data))
        .catch((error) => console.error("Error fetching found items:", error))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  const returnBack = () => {
    navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  if (loading)
    return (
      <div className="text-center mt-5 fs-6 text-muted">
        Loading found items...
      </div>
    );

  const pageTitle =
    currentUser?.role === "Admin"
      ? "Found Item Report"
      : "My Found Items Report";
  const pageDescription =
    currentUser?.role === "Admin"
      ? "All items that have been reported as found."
      : "Items you reported as found.";

  return (
    <div className="lost-item-page d-flex justify-content-center align-items-start py-5">
      <div className="card shadow-sm p-4 lost-item-card w-75">
        <div className="text-center mb-4">
          <FaBox size={40} className="text-primary mb-2" />
          <h4 className="fw-semibold text-primary">{pageTitle}</h4>
          <p className="text-secondary small">{pageDescription}</p>
        </div>

        {itemList.length === 0 ? (
          <div className="text-center py-5">
            <h6 className="fw-semibold text-secondary mb-2">
              No Found Items Available
            </h6>
            <p className="text-muted small">
              There are currently no items marked as found.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover align-middle text-center">
              <thead className="table-primary small">
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Brand</th>
                  <th>Location</th>
                  <th>Found Date</th>
                  <th>Entry Date</th>
                  <th>Reported By</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.foundDate}</td>
                    <td>{item.entryDate}</td>
                    <td>{item.username}</td>
                    <td>{item.userEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-end mt-4">
          <button
            onClick={returnBack}
            className="btn btn-primary btn-sm fw-semibold px-3 py-1"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundItemReport;
