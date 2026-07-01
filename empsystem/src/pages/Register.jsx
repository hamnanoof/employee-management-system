import React, { useState } from "react";
import axios from "axios";
import  API_URL  from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);
      alert("Registered Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;