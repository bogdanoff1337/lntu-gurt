import clsx from "clsx";
import { FC, memo } from "react";
import cls from "./Loader.module.scss";

interface LoaderProps {
	className?: string;
}

export const Loader: FC<LoaderProps> = memo(({ className }) => (
	<div className={clsx(cls.ldsEllipsis, [className])}>
		<div />
		<div />
		<div />
		<div />
	</div>
));
