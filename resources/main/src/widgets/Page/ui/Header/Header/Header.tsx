import clsx from "clsx";
import { FC, memo } from "react";
import { UserMenu } from "@/features/Menu";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = memo(({ className }) => {
	return (
		<header className={clsx(cls.Header, [className])}>
			<Container className={cls.Header__container}>
				<Logo />
				<UserMenu />

				{/* <div>Bread crumbs</div> */}
			</Container>
		</header>
	);
});
