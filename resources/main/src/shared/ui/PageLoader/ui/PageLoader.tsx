import clsx from "clsx";
import { FC } from "react";
import { Loader } from "../../Loader";
import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
	className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => (
	<div className={clsx(cls.PageLoader, {}, [className])}>
		<Loader />
	</div>
);
