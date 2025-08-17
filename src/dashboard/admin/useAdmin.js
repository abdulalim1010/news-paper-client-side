import { useEffect, useState } from "react";
;
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";

const useAdmin = () => {
  const { user } =UseAuth()
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://y-ruby-three.vercel.app/users?email=${user.email}`)
        .then(res => {
          setIsAdmin(res.data?.role === "admin");
          setAdminLoading(false);
        })
        .catch(err => {
          console.error("Admin check error:", err);
          setAdminLoading(false);
        });
    }
  }, [user]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
