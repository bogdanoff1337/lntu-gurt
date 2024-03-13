import { FC, ReactNode } from "react";
import { classNames } from "../../../lib/classNames/classNames";
import cls from "./CardGrid.module.scss";

interface CardGridProps {
	className?: string;
	children?: ReactNode;
	moodifier?: CardGridModifier;
}

export enum CardGridModifier {
	V1 = "CardGrid_v1",
}

export const CardGrid: FC<CardGridProps> = ({ className, children, moodifier = CardGridModifier.V1 }) => {
	return (
		<ul className={classNames(cls.CardGrid, {}, [className, cls[moodifier]])}>
			{children}
		</ul>
	);
};
