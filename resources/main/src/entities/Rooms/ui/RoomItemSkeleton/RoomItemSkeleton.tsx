import clsx from "clsx";
import { FC } from "react";
import cls from "./RoomItemSkeleton.module.scss";
import { Skeleton } from "@/shared/ui/Skeleton";

interface RoomItemSkeletonProps {
	className?: string;
	image?: string;
	alt?: string;
	number?: string;
	to?: string;
}

export const RoomItemSkeleton: FC<RoomItemSkeletonProps> = ({
	className
}) => {
	return (
		<li className={clsx(cls.RoomItemSkeleton, [className])}>
			<div className={cls.RoomItemSkeleton__link}>
				<Skeleton className={cls.RoomItemSkeleton__image} />
				<Skeleton className={cls.RoomItemSkeleton__number}>&nbsp;</Skeleton>
			</div>
		</li>
	);
};
