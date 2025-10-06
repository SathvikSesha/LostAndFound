import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import {
  lostItemSubmission,
  itemIdGenerator,
} from "../../Services/LostFoundItemService";
import { getUserDetails } from "../../Services/LoginService";
import { useEffect } from "react";

const LostItemSubmit = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newId, setNewId] = useState("");
  const [campusUser, setCampusUser] = useState(null); // Changed to store the full user object

  const [item, setItem] = useState({
    itemId: 0,
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
  });

  const today = new Date().toISOString().slice(0, 10);
  const [ldate, setLdate] = useState(today);
  const [edate, setEdate] = useState(today);

  useEffect(() => {
    itemIdGenerator().then((response) => setNewId(response.data));

    getUserDetails().then((response) => {
      const userData = response.data;
      setCampusUser(userData); // Store the entire user object
      setItem((prev) => ({
        ...prev,
        username: userData.username,
        userEmail: userData.email,
      }));
    });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem((values) => ({ ...values, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const lostItemFormSubmit = () => {
    const finalItem = {
      ...item,
      itemId: newId,
      username: campusUser.username,
      userEmail: campusUser.email,
      lostDate: ldate,
      entryDate: edate,
    };

    return lostItemSubmission(finalItem).then(() => {
      alert("Lost Item Submitted Successfully!");
      if (campusUser?.role === "Admin") {
        // Logic now works correctly
        navigate("/AdminMenu");
      } else {
        navigate("/StudentMenu");
      }
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let tempErrors = {};
    let isValid = true;

    // --- Validation logic remains the same ---
    if (!ldate) {
      tempErrors.lostDate = "Lost Date is required";
      isValid = false;
    }
    if (!edate) {
      tempErrors.entryDate = "Entry Date is required";
      isValid = false;
    }
    if (!String(item.itemName || "").trim()) {
      tempErrors.itemName = "Item Name is required";
      isValid = false;
    }
    if (!String(item.location || "").trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!String(item.category || "").trim()) {
      tempErrors.category = "Item Category is required";
      isValid = false;
    }
    if (!String(item.brand || "").trim()) {
      tempErrors.brand = "Item Brand is required";
      isValid = false;
    }
    if (!String(item.color || "").trim()) {
      tempErrors.color = "Item Color is required";
      isValid = false;
    }
    // --- End of validation logic ---

    setErrors(tempErrors);
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    lostItemFormSubmit()
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Submission failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const returnBack = () => {
    if (campusUser?.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-4">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: "900px" }}>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle mb-4"
                style={{ width: "64px", height: "64px" }}
              >
                <FaBoxOpen size={35} className="text-primary" />
              </div>
              <h2 className="h2 fw-bold text-dark text-center">Lost Item Submission</h2>
              <p className="text-muted mt-2">Report an item you have lost.</p>
            </div>

            <form onSubmit={handleValidation}>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Generated Item ID</label>
                    <input className="form-control bg-light" value={newId ?? ""} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input className="form-control bg-light" value={item.username ?? ""} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">User Email</label>
                    <input className="form-control bg-light" value={item.userEmail ?? ""} readOnly />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="lostDate" className="form-label">Select Lost Date *</label>
                    <input
                      id="lostDate"
                      type="date"
                      className={`form-control ${errors.lostDate ? "is-invalid" : ""}`}
                      value={ldate}
                      onChange={(e) => setLdate(e.target.value)}
                    />
                    {errors.lostDate && (
                      <div className="invalid-feedback">{errors.lostDate}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="entryDate" className="form-label">Select Entry Date *</label>
                    <input
                      id="entryDate"
                      type="date"
                      className={`form-control ${errors.entryDate ? "is-invalid" : ""}`}
                      value={edate}
                      onChange={(e) => setEdate(e.target.value)}
                    />
                    {errors.entryDate && (
                      <div className="invalid-feedback">{errors.entryDate}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name *</label>
                    <input
                      id="itemName"
                      name="itemName"
                      className={`form-control ${errors.itemName ? "is-invalid" : ""}`}
                      value={item.itemName ?? ""}
                      onChange={onChangeHandler}
                    />
                    {errors.itemName && (
                      <div className="invalid-feedback">{errors.itemName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <input
                      id="category"
                      name="category"
                      className={`form-control ${errors.category ? "is-invalid" : ""}`}
                      value={item.category ?? ""}
                      onChange={onChangeHandler}
                    />
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color *</label>
                    <input
                      id="color"
                      name="color"
                      className={`form-control ${errors.color ? "is-invalid" : ""}`}
                      value={item.color ?? ""}
                      onChange={onChangeHandler}
                    />
                    {errors.color && (
                      <div className="invalid-feedback">{errors.color}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand *</label>
                    <input
                      id="brand"
                      name="brand"
                      className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                      value={item.brand ?? ""}
                      onChange={onChangeHandler}
                    />
                    {errors.brand && (
                      <div className="invalid-feedback">{errors.brand}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location Where it was Lost *</label>
                    <input
                      id="location"
                      name="location"
                      className={`form-control ${errors.location ? "is-invalid" : ""}`}
                      value={item.location ?? ""}
                      onChange={onChangeHandler}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row gap-3 mt-4">
                <button
                  type="button"
                  onClick={returnBack}
                  className="btn btn-secondary w-100"
                >
                  Return
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit Lost Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemSubmit;
