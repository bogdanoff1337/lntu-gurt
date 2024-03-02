import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children, auth }: { children: ReactNode, auth?: string }) => {
	return children;
};
