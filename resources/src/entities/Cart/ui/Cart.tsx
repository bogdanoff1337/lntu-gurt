import { FC } from "react";
import cls from "./Cart.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface CartProps {
	className?: string
}

export const Cart: FC<CartProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Cart, {}, [className])}>
			
		</div>
	)
}