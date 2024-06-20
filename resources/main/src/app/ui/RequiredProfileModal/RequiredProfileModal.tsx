import clsx from "clsx";
import { FC, memo } from "react";
import { getProfileRoutePath } from "@/shared/config/routes/path";
import { ButtonModifier, NavLinkButton } from "@/shared/ui/Buttons";
import { Modal } from "@/shared/ui/Modal";
import cls from "./RequiredProfileModal.module.scss";

interface RequiredProfileModalProps {
	className?: string;
	setIsOpen: (oppened: boolean) => void;
	isOpen: boolean;
}

export const RequiredProfileModal: FC<RequiredProfileModalProps> = memo(({
	className,
	setIsOpen, isOpen, ...otherProps
}) => {
	return (
		<Modal
			className={clsx(cls.RequiredProfileModal, [className])}
			setIsOpen={setIsOpen}
			isOpen={isOpen}
			{...otherProps}
		>
			<h2 className={cls.RequiredProfileModal__title}>Будь ласка, заповніть свій профіль</h2>
			<p className={clsx(cls.RequiredProfileModal__paragraph, [cls.RequiredProfileModal__paragraph_1])}>Для того, щоб продовжити бронювання кімнати, необхідно заповнити інформацію у вашому профілі.</p>
			<p className={clsx(cls.RequiredProfileModal__paragraph, [cls.RequiredProfileModal__paragraph_2])}>
				<NavLinkButton
					className={cls.RequiredProfileModal__link}
					modifier={ButtonModifier.CLEAR}
					to={getProfileRoutePath()}
					onClick={() => setIsOpen(false)}
				>
					Перейдіть до вашого профілю
				</NavLinkButton>
			</p>
		</Modal>
	);
});
