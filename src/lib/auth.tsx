import { getUser } from "@/features/auth/api/getUser";
import {
  LoginCredentialDTO,
  loginWithUsernameAndPassword,
} from "@/features/auth/api/login";
import {
  RegisterCredentialDTO,
  registerWithUsernameAndPassword,
} from "@/features/auth/api/register";
import { AuthUser, UserResponse } from "@/features/auth/types";
import { storage } from "@/utils/storage";
import { configureAuth } from "react-query-auth";

function handleUserResponse(data: UserResponse) {
  const { jwt, userInfo } = data;
  storage.setToken(jwt);
  return userInfo;
}

async function userFn() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }

  return null;
}

async function loginFn(credentails: LoginCredentialDTO) {
  const response = await loginWithUsernameAndPassword(credentails);
  const user = handleUserResponse(response);
  return user;
}

async function registerFn(credentails: RegisterCredentialDTO) {
  const response = await registerWithUsernameAndPassword(credentails);
  const user = handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
  AuthLoader() {
    return <div>Loading...</div>; // TODO: replace with a loading spinner
  },
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth<
    AuthUser | null,
    unknown,
    LoginCredentialDTO,
    RegisterCredentialDTO
  >(authConfig);
