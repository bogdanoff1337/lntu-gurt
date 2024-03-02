import { FC } from "react";
import cls from "./Favorite.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface FavoriteProps {
	className?: string
}

export const Favorite: FC<FavoriteProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Favorite, {}, [className])}>
			
		</div>
	)
}