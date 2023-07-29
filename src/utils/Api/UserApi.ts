import axios from "./Api";
import { IUser, IUserCreate, IUserUpdate } from "../Interfaces";

export const getUser = async (token: string) => {
  try {
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserAll = async (token: string) => {
  try {
    const response = await axios.get("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (token: string, id: number) => {
  try {
    const response = await axios.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByUsername = async (token: string, username: string) => {
  try {
    const response = await axios.get(`/user/username/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = async (token: string, email: string) => {
  try {
    const response = await axios.get(`/user/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserRole = async (token: string) => {
  try {
    const response = await axios.get("/user/role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.name;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (token: string, user: IUserCreate) => {
  try {
    const response = await axios.post("/user", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (token: string, user: IUserUpdate) => {
  try {
    const response = await axios.put("/user", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (token: string, id: number) => {
  try {
    const response = await axios.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const hardUpdateUser = async (token: string, user: IUser) => {
  try {
    const response = await axios.put("/user/hard-update", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const changePassword = async (token: string, password: string) => {
  try {
    const response = await axios.post(
      `/user/change-password`,
      password,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const setAnnulTimeOff = async (token: string, id: number, AnnualTimeoff: Number) => {
  try {
    const response = await axios.post(
      `/timeoff/${id}/set-annual`,
      AnnualTimeoff,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
