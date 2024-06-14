import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, memo } from "react";
import { MenuItems } from "../MenuItems/MenuItems";
import cls from "./DropDown.module.scss";

interface DropDownProps {
	className?: string;
	isShow?: boolean;
}

export const DropDown: FC<DropDownProps> = memo(({ className, isShow }) => {
	return (
		<Transition
			show={isShow}
			className={clsx(cls.DropDown, [className])}
			enter={cls.Transition_enter}
			enterFrom={cls.Transition_enterFrom}
			enterTo={cls.Transition_enterTo}
			leave={cls.Transition_leave}
			leaveFrom={cls.Transition_leaveFrom}
			leaveTo={cls.Transition_leaveTo}
			as="ul"
		>
			<MenuItems />
		</Transition>
	);
});
