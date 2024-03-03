import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./PopularBrandsItem.module.scss";

interface PopularBrandsItemProps {
	className?: string;
	src: string;
	alt: string;
}

export const PopularBrandsItem: FC<PopularBrandsItemProps> = ({ className, src, alt }) => {
	return (
		<li className={cn(cls.PopularBrandsItem, {}, [className])}>
			<img className={cls.PopularBrandsItem__image} src={src} alt={alt} />
		</li>
	);
};
