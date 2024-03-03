import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Cart.module.scss";

interface CartProps {
	className?: string
}

export const Cart: FC<CartProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Cart, {}, [className])} />
	);
};
