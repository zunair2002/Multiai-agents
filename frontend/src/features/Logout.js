import api from "../utils/axiosconfig.js";

export const Logout = async () => {
  try {
    await api.post("/api/auth/logout");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
