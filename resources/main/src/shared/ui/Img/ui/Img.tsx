import clsx from "clsx";
import {
	FC, ImgHTMLAttributes, ReactNode, useLayoutEffect, useState,
} from "react";
import { Skeleton } from "../../Skeleton";
import cls from "./Img.module.scss";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	fallback?: ReactNode;
	errorFallback?: ReactNode;
	src: string;
}

export const Img: FC<ImgProps> = ({
	className, fallback, errorFallback, src, ...otherProps
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src;

		img.onerror = () => {
			setIsLoading(false);
			setIsError(true);
		};

		img.onload = () => {
			setIsLoading(false);
		};
	}, [src]);

	if (isError) {
		return errorFallback || null;
	}

	if (isLoading) {
		return fallback || <Skeleton className={clsx(cls.Img, [className])} />;
	}

	return (
		<img
			className={clsx(cls.Img, [className])}
			src={src}
			{...otherProps}
		/>
	);
};
