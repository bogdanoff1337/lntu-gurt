import { Menu, Transition } from "@headlessui/react";
import { FC } from "react";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import UserIcon from "../assets/profile.svg?react";
import cls from "./HeaderMenu.module.scss";

interface HeaderMenuProps {
	className?: string
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ className }) => {
	return (
		<Menu as="div" className={cn(cls.HeaderMenu, {}, [className])}>
			<Menu.Button className={cls.HeaderMenu__button}>
				<UserIcon className={cls.HeaderMenu__icon} />
			</Menu.Button>
			<Transition
				enter={cls.Transition_enter}
				enterFrom={cls.Transition_enterFrom}
				enterTo={cls.Transition_enterTo}
				leave={cls.Transition_leave}
				leaveFrom={cls.Transition_leaveFrom}
				leaveTo={cls.Transition_leaveTo}
			>
				<Menu.Items as="ul" className={cls.HeaderMenu__list}>
					<Menu.Item as="li" className={cn(cls.ItemHeaderMenu, {}, [cls.HeaderMenu__item])}>
						<button className={cls.ItemHeaderMenu__button}>
							<UserIcon className={cls.ItemHeaderMenu__icon} />
							<span className={cls.ItemHeaderMenu__name}>Профіль</span>
							<ArrowIcon className={cls.ItemHeaderMenu__arrowIcon} />
						</button>
					</Menu.Item>
					<Menu.Item as="li" className={cn(cls.ItemHeaderMenu, {}, [cls.HeaderMenu__item])}>
						<button className={cls.ItemHeaderMenu__button}>
							<UserIcon className={cls.ItemHeaderMenu__icon} />
							<span className={cls.ItemHeaderMenu__name}>Профіль</span>
							<ArrowIcon className={cls.ItemHeaderMenu__arrowIcon} />
						</button>
					</Menu.Item>
				</Menu.Items>
			</Transition>

		</Menu>
	);
};
