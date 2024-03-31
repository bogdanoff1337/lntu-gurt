export const getMainRoutePath = () => "/";
export const getRegisterRoutePath = () => "/register";
export const getLoginRoutePath = () => "/login";
export const getRoomsRoutePath = (id?: number | string) => `/rooms${id ? `/${id}` : ""}`;
export const getBookRoutePath = (id?: number | string) => `/book${id ? `/${id}` : ""}`;
