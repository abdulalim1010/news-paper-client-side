// context/RoleProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";


const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user } = UseAuth()
  const [role, setRole] = useState("user");
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRole("user");
        setLoadingRole(false);
        return;
      }
      try {
        const res = await axios.get(`/users?email=${user.email}`);
        setRole(res.data?.role || "user");
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  return (
    <RoleContext.Provider value={{ role, loadingRole, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
