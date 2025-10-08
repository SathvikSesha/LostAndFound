import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../Services/LostFoundItemService";
import { deleteStudent } from "../../Services/LoginService";
import "../../DeleteStudent.css";

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllStudents();
      setStudents(res.data ?? []);
    } catch (e) {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (username) => {
    if (!window.confirm(`Delete student ${username}?`)) return;
    setDeleting(username);
    setError("");
    try {
      await deleteStudent(username);
      setStudents((prev) => prev.filter((s) => s.username !== username));
    } catch (e) {
      setError("Failed to delete student");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="text-center mt-5 fs-6">Loading...</div>;

  return (
    <div className="delete-student-page d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-sm p-4 delete-student-card w-75">
        <h4 className="fw-semibold text-center text-primary mb-3">
          Remove Student
        </h4>

        {error && (
          <div className="alert alert-danger py-2 text-center small mb-3">
            {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-sm table-striped align-middle text-center">
            <thead className="table-primary small">
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.username}>
                  <td>{s.username}</td>
                  <td>{s.personName}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>
                  <td>
                    <button
                      onClick={() => onDelete(s.username)}
                      disabled={deleting === s.username}
                      className="btn btn-danger btn-sm delete-btn px-3 py-1"
                    >
                      {deleting === s.username ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
