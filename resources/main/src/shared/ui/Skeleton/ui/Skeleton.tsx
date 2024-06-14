import clsx from "clsx";
import {
	FC, ReactNode,
	memo,
} from "react";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
	className?: string;
	circle?: string | number;
	children?: ReactNode;
}

export const Skeleton: FC<SkeletonProps> = memo(({
	className,
	circle,
	children,
}) => {
	return (
		<div
			className={clsx(cls.Skeleton, [className])}
			style={{ borderRadius: circle }}
		>
			{children}
		</div>
	);
});
