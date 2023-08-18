import { useCallback } from "react";
import { useUser } from "./auth";

export enum ROLES {
  MANAGER = "Manager",
  EMPLOYEE = "Employee",
}

export const useAuthorization = () => {
  const user = useUser();

  if (!user) throw Error("User is not exist!");

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: string[] }) => {
      if (user.data?.roles) {
        if (allowedRoles.some((role) => user.data?.roles.includes(role)))
          return true;
      }
      return false;
    },
    [user.data?.roles]
  );

  return { checkAccess };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: string[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) canAccess = checkAccess({ allowedRoles });

  if (typeof policyCheck !== "undefined") canAccess = policyCheck;

  return <>{canAccess ? children : forbiddenFallback}</>;
};
