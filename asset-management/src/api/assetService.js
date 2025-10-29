import axios from "axios";

//  Base API URL — using environment variable from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    TokenVal: import.meta.env.VITE_API_TOKEN,
  },
});

//  Fetch asset list
export const getAssetList = async () => {
  try {
    const body = {
      AssetKey: 0,
      CreatedUserKey: import.meta.env.VITE_DEFAULT_USER_KEY,
      CreatedBy: import.meta.env.VITE_DEFAULT_USER_NAME,
    };

    const response = await api.post("/GetAssetList", body);
    console.log("Raw API Response:", response.data);

    // --- handle both possible structures ---
    if (Array.isArray(response.data?.data)) {
      // Case 1: when data is a direct array of assets
      console.log("Parsed asset array:", response.data.data);
      return response.data.data;
    }

    if (
      response.data?.data?.Result &&
      Array.isArray(response.data.data.Result)
    ) {
      // Case 2: when data is wrapped inside Result arrays
      const resultArray = response.data.data.Result[8] || []; // 9th item contains assets
      console.log("Parsed Result[8] assets:", resultArray);
      return resultArray;
    }

    console.warn("Unexpected API format:", response.data);
    return [];
  } catch (error) {
    console.error("getAssetList API Error:", error.message);
    throw error;
  }
};

// Fetch dashboard data (reusable for charts)
export const getDataDashboard = async (overrides = {}) => {
  try {
    const body = {
      CompanyKey: "0",
      CityKey: 0,
      SiteKey: 0,
      CreatedUserKey: import.meta.env.VITE_DEFAULT_USER_KEY,
      CreatedBy: import.meta.env.VITE_DEFAULT_USER_NAME,
      ...overrides,
    };

    const resp = await api.post("/GetAssetDataDashboard", body);
    // The backend returns an envelope under resp.data (or resp.data.data).
    const source = resp?.data ?? resp;

    // prefer the inner data wrapper if present
    const wrapper = source?.data ?? source?.Data ?? source;

    // If Result exists, return the wrapper so callers can read wrapper.Result
    if (wrapper && (wrapper.Result || wrapper.result)) {
      return wrapper;
    }

    // fallback: try to find Result in nested fields
    for (const k of ["data", "Data", "Result", "result"]) {
      if (wrapper && wrapper[k]) return wrapper[k];
    }

    // otherwise return the raw wrapper
    return wrapper;
  } catch (err) {
    console.error("getDataDashboard error:", err);
    throw err;
  }
};
