import { useNavigate } from "react-router-dom";

const SignOut = () => {
  localStorage.removeItem("authToken");
  const navigate = useNavigate();
  navigate("/auth/sign-in");
};

export default SignOut;
