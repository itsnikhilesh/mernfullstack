import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetching single user data
  const getSingleData = async () => {
    const response = await fetch(`http://localhost:8000/${id}`);
    const result = await response.json();

    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
      setLoading(false); // Data fetched successfully, stop loading
    } else {
      setError(result.error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  // Sending edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age }; // Ensure correct field names
    const response = await fetch(`http://localhost:8000/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const result = await response.json();
    if (response.ok) {
      setError("");
      navigate("/read"); // Redirect after successful update
    } else {
      setError(result.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit Data</h1>
      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;







