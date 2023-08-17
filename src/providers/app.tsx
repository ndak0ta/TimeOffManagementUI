import { Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/react-query";


const ErrorFallBack = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
          <QueryClientProvider client={queryClient}>
            {/* TODO Daha sonra componentler ekle */}
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </LocalizationProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
