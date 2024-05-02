import clsx from "clsx";
import { FC } from "react";
import cls from "./Loader.module.scss";

interface LoaderProps {
	className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
	<div className={clsx(cls.ldsEllipsis, [className])}>
		<div />
		<div />
		<div />
		<div />
	</div>
);
