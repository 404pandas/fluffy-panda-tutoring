import { UserLogin } from "../interfaces/UserLogin";
import { UserSignup } from "../interfaces/UserSignup";

const login = async (userInfo: UserLogin) => {
  console.log("Route hit: /auth/login");
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    if (!response.ok) {
      throw new Error("User information not retrieved, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from user login: ", err);
    return Promise.reject("Could not fetch user info");
  }
};

const signup = async (userInfo: UserSignup) => {
  console.log("Route hit: /auth/register");
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Signup failed, please try again.");
    }

    return data;
  } catch (err) {
    console.error("Error from user signup: ", err);
    return Promise.reject("Could not complete signup");
  }
};

export { login, signup };
