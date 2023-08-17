import { useCallback } from "react";
import { useUser } from "./auth";

export enum ROLES {
  MANAGER = "Manager",
  EMPLOYEE = "Employee",
}


export const useAuthorization = () => {
  const user = useUser().data;

  if (!user) throw Error("User is not exist!");

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: string[] }) => {
      if (allowedRoles.some((role) => user.roles.includes(role))) return true;
      return false;
    },
    [user.roles]
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
