import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Overlay, OverlayModifier } from "@/shared/ui/Overlay";
import { Portal } from "@/shared/ui/Portal";
import { getIsShow } from "../../model/selectors";
import { MenuItems } from "../MenuItems/MenuItems";
import cls from "./Aside.module.scss";

interface AsideProps {
	className?: string;
	isShow: boolean;
}

export const Aside: FC<AsideProps> = ({ className, isShow }) => {
	const [headerHeight, setHeaderHeight] = useState(0);

	useEffect(() => {
		document.body.style.overflow = isShow ? "hidden" : "auto";
	}, [isShow]);

	useEffect(() => {
		const header = document.querySelector("header");

		setHeaderHeight(header?.clientHeight || 0);
	}, [isShow]);

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
					style={{ paddingTop: `${headerHeight + 30}px` }}
				>
					<ul className={cls.Aside__list}>
						<MenuItems />
					</ul>
				</aside>
			</Overlay>

		</Portal>

	);
};
