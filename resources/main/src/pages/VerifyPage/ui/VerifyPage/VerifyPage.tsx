import clsx from "clsx";
import { FC } from "react";
import { useSelector } from "react-redux";
import { entityAuthSelectors } from "@/entities/Auth";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import cls from "./VerifyPage.module.scss";

interface VerifyPageProps {
	className?: string;
}

export const VerifyPage: FC<VerifyPageProps> = ({ className }) => {
	const authData = useSelector(entityAuthSelectors.getData);
	return (
		<div className={clsx(cls.VerifyPage, [className])}>
			<Container className={cls.VerifyPage__container} modifier={ContainerModifier.AUTH}>
				<div className={cls.VerifyPage__shell}>
					<p className={cls.VerifyPage__text}>
						Надіслано підтвердження на пошту <b className={cls.VerifyPage__bold}>{authData?.email}</b>
					</p>
				</div>
			</Container>
		</div>
	);
};
