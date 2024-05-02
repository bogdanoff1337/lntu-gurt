import clsx from "clsx";
import { FC, ReactNode, memo } from "react";
import { UserMenu } from "@/features/Menu";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string;
	Breadcrumbs?: ReactNode;
}

export const Header: FC<HeaderProps> = memo(({ className, Breadcrumbs }) => {
	return (
		<header className={clsx(cls.Header, [className])}>
			<Container className={cls.Header__container}>
				<div className={clsx(cls.Header__cell, [cls.Header__cell_1])}>
					<Logo />
				</div>
				<div className={clsx(cls.Header__cell, [cls.Header__cell_2])}>
					{Breadcrumbs && Breadcrumbs}
				</div>
				<div className={clsx(cls.Header__cell, [cls.Header__cell_3])}>
					<UserMenu />
				</div>
			</Container>
		</header>
	);
});
