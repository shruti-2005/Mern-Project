import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const { authorizationToken,API } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  
// ✅ Frontend service function to call backend delete
const deleteContactAPI = async (id, token) => {
  const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (!response.ok) throw new Error("Failed to delete contact");
  return response.json();
};


  // Fetch contacts from backend
  const getContactsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });

      if (!response.ok) {
        toast.error("Failed to fetch contacts");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Something went wrong while fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete using backend controller
const handleDelete = (id) => {
  const toastId = toast.info(
    <div>
      <p>Are you sure you want to delete this contact?</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        <button
          onClick={async () => {
            try {
              await deleteContactAPI(id, authorizationToken);
              setContacts(prev => prev.filter(c => c._id !== id));
              toast.dismiss(toastId);
              toast.success("Contact deleted successfully");
            } catch (err) {
              toast.dismiss(toastId);
              toast.error(err.message || "Failed to delete contact");
            }
          }}
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss(toastId)}>No</button>
      </div>
    </div>,
    { autoClose: false, closeOnClick: false }
  );
};


  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <section className="admin-contacts-section">
      <div className="container">
        <h1>Admin Contacts Data</h1>
      </div>
      <div className="container admin-contacts">
        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(contacts) && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.username}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No contacts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
