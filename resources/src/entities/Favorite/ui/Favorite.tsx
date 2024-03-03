import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Favorite.module.scss";

interface FavoriteProps {
	className?: string
}

export const Favorite: FC<FavoriteProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Favorite, {}, [className])} />
	);
};
