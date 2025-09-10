import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const { id } = useParams(); // user ID from URL
  const navigate = useNavigate();
  const { authorizationToken,API } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // fetch user details by id
  const getUserById = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } else {
        toast.error("Failed to fetch user details");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("User updated successfully ✅");
        navigate("/admin/users"); // go back to user list
      } else {
        toast.error("Failed to update user ❌");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <section className="update-user-section">
      <div className="form-container">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit} className="update-form">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Update User</button>
        </form>
      </div>
    </section>
  );
};
