import axios from "axios";
import { IRegisterModel } from "../types/types.ts";


const BASE_URL = "http://localhost:8000/auth/register/";

export const fetchRegister = async (registerModel: IRegisterModel) => {
    const response = await axios.post(BASE_URL,
        JSON.stringify(registerModel),
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    return response.status;
}