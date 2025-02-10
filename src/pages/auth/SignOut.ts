import {config} from "@/config";
import {token} from "@/lib/token/Token";

const SignOut = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
    const parsedData = await response.json();
    if (!response.ok) {
      throw new Error(parsedData.message || parsedData.errors || 'Failed to fetch data');
    }
    localStorage.removeItem("authToken");
    window.location.href = "/auth/sign-in";
  } catch (err) {
    console.log("Logout error => ", err);
  }
};

export default SignOut;
