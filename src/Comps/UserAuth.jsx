import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuth = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  return null;
};

export default UserAuth;
