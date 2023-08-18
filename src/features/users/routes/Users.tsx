import { Authorization, ROLES } from "@lib/authorization";
import { UserList } from "../components/UserList";

export function Users() {
  return (
      <Authorization
        forbiddenFallback={<h1>Sadece Manager görebilir</h1>}
        allowedRoles={[ROLES.MANAGER]}
      >
        <UserList />
      </Authorization>
  );
}
