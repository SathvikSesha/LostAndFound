import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../Services/LoginService";
import "../../StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-5 fs-6">Loading students...</div>;

  if (students.length === 0)
    return <div className="text-center mt-5 fs-6">No students found.</div>;

  return (
    <div className="student-list-page d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-sm p-4 student-list-card w-75">
        <h4 className="fw-semibold text-center text-primary mb-4">
          Student List
        </h4>

        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover align-middle text-center">
            <thead className="table-primary small">
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.username}>
                  <td>{student.username}</td>
                  <td>{student.personName}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
