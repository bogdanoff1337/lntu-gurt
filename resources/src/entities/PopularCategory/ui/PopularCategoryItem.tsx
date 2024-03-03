import { FC } from "react";
import { NavLink } from "react-router-dom";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./PopularCategoryItem.module.scss";

interface PopularCategoryItemProps {
	className?: string;
	title: string;
	src: string;
	modifier?: PopularCategoryItemModifier;
	to: string;
}

export enum PopularCategoryItemModifier {
	GREEN = "PopularCategoryItem_green",
	YELLOW = "PopularCategoryItem_yellow",
	BLUE = "PopularCategoryItem_blue",
	LIGHTBLUE = "PopularCategoryItem_lightBlue",
	PURPLE = "PopularCategoryItem_purple",
	RED = "PopularCategoryItem_red",
}

export const PopularCategoryItem: FC<PopularCategoryItemProps> = ({
	className, title, src, to, modifier = "",
}) => {
	return (
		<li className={cn(cls.PopularCategoryItem, {}, [className, cls[modifier]])}>
			<NavLink className={cls.PopularCategoryItem__link} to={to}>
				<h2 className={cls.PopularCategoryItem__title}>{title}</h2>
				<img className={cls.PopularCategoryItem__image} src={src} alt={title} />
			</NavLink>
		</li>
	);
};
