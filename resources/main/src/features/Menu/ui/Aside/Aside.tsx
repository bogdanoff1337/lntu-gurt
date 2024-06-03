import clsx from "clsx";
import {
	FC, useCallback, useEffect, useRef, useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Devices } from "@/shared/const/devices";
import { useClickWindow } from "@/shared/hooks/useClickWindow/useClickWindow";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Overlay, OverlayModifier } from "@/shared/ui/Overlay";
import { Portal } from "@/shared/ui/Portal";
import { useClickWindowCloseMenu } from "../../hooks/useClickWindowCloseMenu";
import { featureMenuActions } from "../../model/slice/featureOverlaySlice";
import { MenuItems } from "../MenuItems/MenuItems";
import cls from "./Aside.module.scss";

interface AsideProps {
	className?: string;
	isShow: boolean;
}

export const Aside: FC<AsideProps> = ({ className, isShow }) => {
	const dispatch = useAppDispatch();
	const isMobile = useMediaQuery({ maxWidth: Devices.MOBILE });
	const asideRef = useRef<any>();

	const [headerHeight, setHeaderHeight] = useState(0);

	const [isDrag, setIsDrag] = useState(false);
	const [clientStartX, setClientStartX] = useState(0);
	const [clientX, setClientX] = useState(0);

	useEffect(() => {
		if (isShow) {
			document.body.classList.add(cls.overflowHidden);
		} else {
			document.body.classList.remove(cls.overflowHidden);
		}
	}, [isShow]);

	useEffect(() => {
		const header = document.querySelector("header");

		setHeaderHeight(header?.clientHeight || 0);
	}, [isShow, isMobile]);

	const onCloseClickHandler = useCallback((e: any) => {
		if (e.target !== asideRef.current) {
			dispatch(featureMenuActions.setIsShow(false));
		}
	}, [dispatch]);

	useClickWindow({ onClick: onCloseClickHandler }, []);

	const onTouchMove = useCallback((event: any) => {
		setIsDrag(true);

		const diffX = event.touches[0].clientX - clientStartX;

		if (diffX <= 0 && diffX < clientStartX) {
			setClientX(diffX);
		}
	}, [clientStartX]);

	const onTouchStart = useCallback((event: any) => {
		setClientStartX(event.touches[0].clientX);
	}, []);

	const onTouchEnd = useCallback(() => {
		setIsDrag(false);

		if ((-asideRef.current.clientWidth / 4) > clientX) {
			dispatch(featureMenuActions.setIsShow(false));
		} else {
			setClientX(0);
		}

		setClientStartX(0);
	}, [clientX, dispatch]);

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
					onTouchMove={onTouchMove}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
					ref={asideRef}
					className={clsx(cls.Aside, {
					}, [className, cls.Overlay__aside])}
					style={{
						paddingTop: `${headerHeight + 30}px`,
						left: isDrag ? `${clientX}px` : undefined,
						transition: isDrag ? "none" : undefined,
					}}
				>
					<ul className={cls.Aside__list}>
						<MenuItems />
					</ul>
				</aside>
			</Overlay>

		</Portal>

	);
};
