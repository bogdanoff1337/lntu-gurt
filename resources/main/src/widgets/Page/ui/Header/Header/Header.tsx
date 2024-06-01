import clsx from "clsx";
import {
	FC, ReactNode, memo, useRef,
} from "react";
import { useMediaQuery } from "react-responsive";
import { To } from "react-router-dom";
import { UserMenu } from "@/features/Menu";
import { Devices } from "@/shared/const/common";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo/ui/Logo";
import { useSmartHeader } from "../../../hooks/useSmartHeader/useSmartHeader";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string;
	breadcrumbsData?: {
		id: number;
		title: string | ReactNode;
		to?: To;
	}[];
}

export const Header: FC<HeaderProps> = memo(({ className, breadcrumbsData }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });
	const headerRef = useRef(null);

	useSmartHeader({
		className: cls.Header_hide,
		condition: isTablet && breadcrumbsData,
		ref: headerRef,
		defaultOffset: 80,
	});

	return (
		<header ref={headerRef} className={clsx(cls.Header, [className])}>
			<Container className={clsx(cls.Header__container, [breadcrumbsData && cls.Header__container_breadcrumbs])}>
				<div className={clsx(cls.Header__cell, [cls.Header__cell_1])}>
					<Logo />
				</div>
				{breadcrumbsData && (
					<div className={clsx(cls.Header__cell, [cls.Header__cell_2])}>
						<Breadcrumbs className={cls.Header__breadcrumbs} data={breadcrumbsData} />
					</div>
				)}
				<div className={clsx(cls.Header__cell, [cls.Header__cell_3])}>
					<UserMenu />
				</div>
			</Container>
		</header>
	);
});
