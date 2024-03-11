import {
	FC, ReactNode, useMemo,
} from "react";
import { classNames } from "../../../lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
	className?: string;
	circle?: string | number;
	children?: ReactNode;
}

export const Skeleton: FC<SkeletonProps> = ({
	className,
	circle,
	children,
}) => {
	return (
		<span
			className={classNames(cls.Skeleton, {}, [className])}
			style={{ borderRadius: circle }}
		>
			{children}
		</span>
	);
};
