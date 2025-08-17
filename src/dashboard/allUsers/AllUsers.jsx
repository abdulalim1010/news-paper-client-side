import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("https://y-ruby-three.vercel.app/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔁 Make Admin Handler
  const handleMakeAdmin = async (email) => {
    try {
      await axios.patch(`https://y-ruby-three.vercel.app/users/admin/${email}`);
      Swal.fire("✅ Success", "User is now an Admin!", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("❌ Error", "Failed to update role", "error");
    }
  };

  // 🌟 Make Premium Handler
  const handleMakePremium = async (email) => {
    try {
      await axios.patch(`https://y-ruby-three.vercel.app/make-premium/${email}`);
      Swal.fire("✅ Success", "User is now Premium!", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("❌ Error", "Failed to update premium status", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success">Admin</span>
                  ) : (
                    <span className="badge badge-ghost">User</span>
                  )}
                </td>
                <td>
                  {user.isPremium ? (
                    <span className="badge badge-primary">Premium</span>
                  ) : (
                    <span className="badge badge-ghost">Free</span>
                  )}
                </td>
                <td className="space-x-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user.email)}
                      className="btn btn-sm btn-warning"
                    >
                      Make Admin
                    </button>
                  )}
                  {!user.isPremium && (
                    <button
                      onClick={() => handleMakePremium(user.email)}
                      className="btn btn-sm btn-info"
                    >
                      Make Premium
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
