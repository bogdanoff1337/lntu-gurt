import clsx from "clsx";
import {
	FC, ReactNode, createElement, memo,
} from "react";
import cls from "./Title.module.scss";

enum Tags {
	h1 = "h1",
	h2 = "h2",
	h3 = "h3",
	h4 = "h4",
	h5 = "h5",
	h6 = "h6",
}

interface TitleProps {
	className?: string;
	children?: ReactNode;
	tag?: Tags;
	modifier?: TitleModifier;
}

export enum TitleModifier {
}

export const Title: FC<TitleProps> = memo(({
	className, children, tag = Tags.h2, modifier = "",
}) => {
	return createElement(tag, { className: clsx(cls.Title, [className, cls[modifier]]) }, children);
});
