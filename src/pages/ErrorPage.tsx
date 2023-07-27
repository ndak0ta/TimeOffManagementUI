import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div>
      <h1>{error?.message}</h1>
    </div>
  );
}
