import React, { useState } from "react";
import axios from "axios";

// Define a function to retrieve the CSRF token from cookies
const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : null;
};

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    try {
      // Send user registration data to backend API
      console.log("CSRF Token:", csrftoken);
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        {
          first_name,
          last_name,
          username,
          email,
          password,
          confirm_password,
          verified: false, // Mark the user as not verified initially
        },
        {
          headers: {
            "X-CSRFToken": csrftoken, // Include CSRF token in the headers
          },
        }
      );

      // Check if response contains data property
      if (response && response.data) {
        // Handle successful registration
        console.log("Registration successful:", response.data);

        // Reset form fields and error state
        setFirst_name("");
        setLast_name("");
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
        setConfirmPassword("");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      // Handle registration error
      console.log(csrftoken + "  testtest");
      console.error("Registration error:", error.response || error.message);
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Register to BOOKSHELF BUDDY</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error message if registration fails */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
