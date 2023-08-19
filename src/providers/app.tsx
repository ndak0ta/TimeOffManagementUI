import React, { Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import "dayjs/locale/tr";
import { NODE_ENV } from "@config/constants";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <ThemeProvider theme={theme}>
              {NODE_ENV !== "production" ? (
                <ReactQueryDevtools initialIsOpen={false} />
              ) : null}
              <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
