// export const USER_API_END_POINT ="http://localhost:3000/api/v1/user";
// export const JOB_API_END_POINT = "http://localhost:3000/api/v1/job";
// export const APPLICATION_END_POINT = "http://localhost:3000/api/v1/application";
// export const COMPANY_API_END_POINT = "http://localhost:3000/api/v1/company";




const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
