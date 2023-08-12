export const tokenClaimNames = {
    exp: "exp",
    iat: "iat",
    iss: "iss",
    aud: "aud",
    sub: "sub", // TODO sonra değiştir
    roles: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
};

export function parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }