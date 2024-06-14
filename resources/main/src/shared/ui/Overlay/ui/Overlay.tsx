import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
	FC, HTMLAttributes, ReactNode, memo,
} from "react";
import cls from "./Overlay.module.scss";

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	isShow: boolean;
	children: ReactNode;
	classNames?: {
		enter: string,
		enterFrom: string;
		enterTo: string;
		leave: string;
		leaveFrom: string;
		leaveTo: string;
	}
	modifier?: OverlayModifier;
}

export enum OverlayModifier {
	AboveAllZindex = "Overlay_aboveAllZindex",
	LowerHeaderZindex = "Overlay_lowerHeaderZindex",
}

export const Overlay: FC<OverlayProps> = memo(({
	className, classNames, isShow, children, modifier = OverlayModifier.AboveAllZindex, ...anotherProps
}) => {
	return (
		<Transition
			show={isShow}
			as="div"
			className={clsx(cls.Overlay, [className, cls[modifier]])}
			enter={clsx(cls.Overlay_enter, [classNames?.enter])}
			enterFrom={clsx(cls.Overlay_enterFrom, [classNames?.enterFrom])}
			enterTo={clsx(cls.Overlay_enterTo, [classNames?.enterTo])}
			leave={clsx(cls.Overlay_leave, [classNames?.leave])}
			leaveFrom={clsx(cls.Overlay_leaveFrom, [classNames?.leaveFrom])}
			leaveTo={clsx(cls.Overlay_leaveTo, [classNames?.leaveTo])}
			{...anotherProps}
		>
			{children}
		</Transition>
	);
});
