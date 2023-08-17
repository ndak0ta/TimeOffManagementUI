const storagePrefix = 'time_off_managemnet_';

export const storage = {
    getToken: () => {
        return JSON.parse(localStorage.getItem(`${storagePrefix}token`) as string);
    },
    setToken: (token: string) => {
        localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    },
    clearToken: () => {
        localStorage.removeItem(`${storagePrefix}token`);
    }
};