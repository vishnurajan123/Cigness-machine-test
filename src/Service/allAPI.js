import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"

// add product
export const addVehicleApi=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/vehicles/add`,reqBody,reqHeader)
}