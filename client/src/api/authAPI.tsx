import { UserLogin } from "../interfaces/UserLogin";

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

export { login };
