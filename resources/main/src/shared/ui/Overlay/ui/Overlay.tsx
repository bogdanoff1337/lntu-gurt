import { Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import cls from "./Overlay.module.scss";

interface OverlayProps {
	className?: string;
	isShow: boolean;
	children: ReactNode;
}

export const Overlay: FC<OverlayProps> = ({ className, isShow, children }) => {
	return (
		<Transition
			show={isShow}
			as="div"
			className={cn(cls.Overlay, {}, [className])}
			enter={cls.Overlay_enter}
			enterFrom={cls.Overlay_enterFrom}
			enterTo={cls.Overlay_enterTo}
			leave={cls.Overlay_leave}
			leaveFrom={cls.Overlay_leaveFrom}
			leaveTo={cls.Overlay_leaveTo}
		>{children}
		</Transition>
	);
};
