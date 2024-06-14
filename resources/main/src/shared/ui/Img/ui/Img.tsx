import clsx from "clsx";
import {
	FC, InputHTMLAttributes, ReactNode, memo, useLayoutEffect, useState,
} from "react";
import { Skeleton } from "../../Skeleton";
import cls from "./Img.module.scss";

type HTMLImageProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

interface ImgProps extends HTMLImageProps {
	className?: {
		image?: string;
		skeleton?: string;
	};
	fallback?: ReactNode;
	errorFallback?: ReactNode;
	src: string;
}

export const Img: FC<ImgProps> = memo(({
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
		return fallback || <Skeleton className={className?.skeleton} />;
	}

	return (
		// @ts-ignore
		<img
			className={clsx(cls.Img, [className?.image])}
			src={src}
			{...otherProps}
		/>
	);
});
