import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Skeleton } from "@/shared/ui/Skeleton";
import FacultySkeleton from "../../assets/skeleton.svg?react";
import cls from "./FacultyItem.module.scss";

interface FacultyItemSkeletonProps {
	className?: string;
}

export const FacultyItemSkeleton: FC<FacultyItemSkeletonProps> = ({
	className,
}) => {
	return (
		<li className={cn(cls.FacultyItem, {}, [className])}>
			<Skeleton className={cls.FacultyItem__img} />
			<h3 className={cls.FacultyItem__slug}>
				<Skeleton>&nbsp;</Skeleton>
				<Skeleton>&nbsp;</Skeleton>
				<Skeleton>&nbsp;</Skeleton>
			</h3>
			<Skeleton>
				<FacultySkeleton />
			</Skeleton>
		</li>
	);
};
