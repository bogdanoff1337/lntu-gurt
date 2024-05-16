import clsx from "clsx";
import { FC } from "react";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import cls from "./NonActivePage.module.scss";

interface NonActivePageProps {
	className?: string;
}

export const NonActivePage: FC<NonActivePageProps> = ({ className }) => {
	return (
		<div className={clsx(cls.NonActivePage, [className])}>
			<Container className={cls.NonActivePage__container} modifier={ContainerModifier.AUTH}>
				<div className={cls.NonActivePage__shell}>
					<p>
						Надіслано підтвердження на пошту <b className={cls.NonActivePage__bold}>vladisl13777@gmail.com</b>
					</p>
				</div>
			</Container>
		</div>
	);
};
