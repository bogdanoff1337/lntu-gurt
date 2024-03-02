export const getLoginRoutePath = () => "/login";
export const getRegisterRoutePath = () => "/register";
export const getMainRoutePath = () => "/";

export const getBabyCarriageRoutePath = (id?: number | string) => `/baby-carriage${id ? `/${id}` : ""}`;
