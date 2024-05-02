import clsx from "clsx";
import {
	FC, memo,
} from "react";
import cls from "./Footer.module.scss";

interface FooterProps {
	className?: string
}

export const Footer: FC<FooterProps> = memo(({ className }) => {
	return (
		<footer className={clsx(cls.Footer, [className])} />
	);
});
