import api from "../utils/axiosconfig.js";

export const getcurrentUser = async () => {
    try {
        const { data } = await api.get("/api/currentuser");
        console.log(data);
    } catch (error) {
        console.log("getcurrentUser error", error);
    }
}
