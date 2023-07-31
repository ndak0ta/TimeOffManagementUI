import axios from "./Api";
import { ITimeOff, ITimeOffRequest } from "../Interfaces";

export const getTimeOff = async (token: string) => {
  try {
    const response = await axios.get("/timeoff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTimeOffAll = async (token: string) => {
  try {
    const response = await axios.get("/timeoff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTimeOffById = async (token: string, id: number) => {
  try {
    const response = await axios.get(`/timeoff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTimeOffByUserId = async (token: string, userId: number) => {
  try {
    const response = await axios.get(`/timeoff/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTimeOff = async (token: string, timeOff: ITimeOffRequest) => {
    try {
      const response = await axios.post("/timeoff", timeOff, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateTimeOff = async (token: string, timeOff: ITimeOffRequest) => {
    try {
      console.log(timeOff);
      const response = await axios.put("/timeoff", timeOff, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteTimeOff = async (token: string, id: number) => {
    try {
      const response = await axios.delete(`/timeoff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const approveTimeOff = async (token: string, id: number) => {
    try {
      const response = await axios.post(`/timeoff/${id}/approve`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
};