export const getMainRoutePath = () => "/";
export const getRegisterRoutePath = () => "/register";
export const getLoginRoutePath = () => "/login";
export const getRoomsRoutePath = (id?: number | string) => `/rooms${id ? `/${id}` : ""}`;
export const getProfileRoutePath = (id?: number | string) => `/profile${id ? `/${id}` : ""}`;
