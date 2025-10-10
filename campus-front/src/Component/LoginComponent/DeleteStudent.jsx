import React, { useEffect, useState } from "react";
import {
  deleteStudentByUsername,
  getAllStudents,
} from "../../Services/LoginService";
import "../../DeleteStudent.css";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data ?? []);
    } catch (e) {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;
    setDeleting(true);
    try {
      await deleteStudentByUsername(selectedStudent.username);
      setStudents((prev) =>
        prev.filter((s) => s.username !== selectedStudent.username)
      );
      setShowModal(false);
    } catch (e) {
      setError("Failed to delete student. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleReturn = () => {
    navigate("/AdminMenu");
  };

  return (
    <div className="delete-student-page d-flex justify-content-center align-items-center py-5">
      <div className="card modern-card shadow-lg p-4 animate-fade-in w-75">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary m-0">🧑‍🎓 Manage Students</h3>
          <button
            onClick={handleReturn}
            className="btn btn-outline-secondary rounded-pill px-4 fw-semibold return-btn"
          >
            ← Return
          </button>
        </div>

        {error && (
          <div className="alert alert-danger text-center py-2 small">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted small">Loading students...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.username} className="table-row-hover">
                      <td>{s.username}</td>
                      <td>{s.personName}</td>
                      <td>{s.email}</td>
                      <td>{s.role}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm px-3 delete-btn"
                          onClick={() => confirmDelete(s)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        className="fade-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <p className="text-muted mb-0">
              Are you sure you want to delete{" "}
              <strong>{selectedStudent.username}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4"
          >
            {deleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteStudent;
