import { FC, memo } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = memo(({ className }) => {
	return (
		<header className={cn(cls.Header, {}, [className])}>
			Header
		</header>
	);
});
