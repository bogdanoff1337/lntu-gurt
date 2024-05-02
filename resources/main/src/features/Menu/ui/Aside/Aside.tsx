import clsx from "clsx";
import { FC } from "react";
import { Overlay, OverlayModifier } from "@/shared/ui/Overlay";
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
			<Overlay
				isShow={isShow}
				modifier={OverlayModifier.LowerHeaderZindex}
				className={cls.Overlay}
				classNames={{
					enter: cls.Overlay_enter,
					enterFrom: cls.Overlay_enterFrom,
					enterTo: cls.Overlay_enterTo,
					leave: cls.Overlay_leave,
					leaveFrom: cls.Overlay_leaveFrom,
					leaveTo: cls.Overlay_leaveTo,
				}}
			>
				<aside
					className={clsx(cls.Aside, {
					}, [className, cls.Overlay__aside])}
				>
					<ul className={cls.Aside__list}>
						<MenuItems />
					</ul>
				</aside>
			</Overlay>

		</Portal>

	);
};
