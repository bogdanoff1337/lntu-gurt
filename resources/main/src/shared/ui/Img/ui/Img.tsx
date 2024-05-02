import clsx from "clsx";
import {
	FC, ReactNode, useLayoutEffect, useState,
} from "react";
import { Skeleton } from "../../Skeleton";
import cls from "./Img.module.scss";

interface ImgProps {
	className?: string;
	src?: string;
	fallback?: ReactNode;
	errorFallback?: ReactNode;
}

export const Img: FC<ImgProps> = ({
	className, src = "", fallback, errorFallback,
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
		return fallback || <Skeleton />;
	}

	return (
		<img
			className={clsx(cls.Img, [className])}
			style={{ aspectRatio: "1 / 1" }}
			src={src}
		/>
	);
};
