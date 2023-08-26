import { atom } from "jotai";

export type SnackbarState = {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
};

export const snackbarAtom = atom({
    open: false,
    message: "",
    severity: "success",
} as SnackbarState);

