import clsx from "clsx";
import {
	FC, ReactNode, memo, useRef,
} from "react";
import { useMediaQuery } from "react-responsive";
import { UserMenu } from "@/features/Menu";
import { Devices } from "@/shared/const/common";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo/ui/Logo";
import { useSmartHeader } from "../../../hooks/useSmartHeader/useSmartHeader";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string;
	Breadcrumbs?: ReactNode;
}

export const Header: FC<HeaderProps> = memo(({ className, Breadcrumbs }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });
	const headerRef = useRef(null);

	useSmartHeader({
		className: cls.Header_hide,
		condition: isTablet && Breadcrumbs,
		ref: headerRef,
	});

	return (
		<header ref={headerRef} className={clsx(cls.Header, [className])}>
			<Container className={clsx(cls.Header__container, [Breadcrumbs && cls.Header__container_breadcrumbs])}>
				<div className={clsx(cls.Header__cell, [cls.Header__cell_1])}>
					<Logo />
				</div>
				{Breadcrumbs && (
					<div className={clsx(cls.Header__cell, [cls.Header__cell_2])}>
						{Breadcrumbs}
					</div>
				)}
				<div className={clsx(cls.Header__cell, [cls.Header__cell_3])}>
					<UserMenu />
				</div>
			</Container>
		</header>
	);
});
