import {
	FC, memo,
} from "react";

import { classNames as cn } from "@/shared/lib/classNames/classNames";

import cls from "./Footer.module.scss";

interface FooterProps {
	className?: string
}

export const Footer: FC<FooterProps> = memo(({ className }) => {

	return (
		<footer className={cn(cls.Footer, {}, [className])}>
		</footer>
	);
});
