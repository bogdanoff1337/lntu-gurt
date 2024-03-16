export const getMainRoutePath = () => "/";
export const getRoomsRoutePath = (id?: number | string) => `/rooms${id ? `/${id}` : ""}`;
export const getBookRoutePath = (id?: number | string) => `/book${id ? `/${id}` : ""}`;

