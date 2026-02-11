import api from "../api/axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const userName = () => {
  return api.get("/employee/me");
};

export const userData=(data)=>{
  return api.put("/employee/update",data);
}
export const punchIn=(data)=>{
  return api.post("/attendance/mark",data);
}
export const punchOut=(data)=>{
  return api.post("/attendance/checkout",data);
}
export const punchInData=()=>{
  return api.get("/attendance/punch-status");
}
export const timeLog=(data)=>{
  return api.post("/logs/add",data);
}
export const deleteTimeLog=(data)=>{
  return api.delete("/logs/delete",{
    data:data
  });
} 

export const getPunchStatus = () => {
  return api.get("/attendance/punch-status");
}