import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { NavLinkButton } from "@/shared/ui/Button";
import cls from "./CategoryItemLink.module.scss";

interface CategoryItemLinkProps {
	className?: string;
	name: string;
	to: string;
	onClick?: () => void;
}

export const CategoryItemLink: FC<CategoryItemLinkProps> = ({
	className, name, to, onClick,
}) => {
	return (
		<li className={cn(cls.CategoryItemLink, {}, [className])}>
			<NavLinkButton className={cls.CategoryItemLink__button} to={to} onClick={onClick}>
				{name}
			</NavLinkButton>
		</li>
	);
};
