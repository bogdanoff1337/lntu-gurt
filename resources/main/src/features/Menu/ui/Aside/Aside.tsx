import { Transition } from "@headlessui/react";
import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Portal } from "@/shared/ui/Portal";
import { MenuItems } from "../MenuItems/MenuItems";
import cls from "./Aside.module.scss";

interface AsideProps {
	className?: string;
	isShow: boolean;
}

export const Aside: FC<AsideProps> = ({ className, isShow }) => {
	return (
		<Portal>
			<Transition
				show={isShow}
				as="aside"
				className={cn(cls.Aside, {
				}, [className])}
				enter={cls.Aside_enter}
				enterFrom={cls.Aside_enterFrom}
				enterTo={cls.Aside_enterTo}
				leave={cls.Aside_leave}
				leaveFrom={cls.Aside_leaveFrom}
				leaveTo={cls.Aside_leaveTo}
			>
				<ul className={cls.Aside__list}>
					<MenuItems />
				</ul>
			</Transition>
		</Portal>

	);
};
