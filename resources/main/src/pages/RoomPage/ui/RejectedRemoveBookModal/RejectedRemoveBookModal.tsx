import clsx from "clsx";
import { FC, memo } from "react";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./RejectedRemoveBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface RejectedRemoveBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
	message: string;
}

export const RejectedRemoveBookModal: FC<RejectedRemoveBookModalProps> = memo(({
	className, setIsOpen, isOpen, message, ...anotherProps
}) => {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className={clsx(cls.RejectedRemoveBookModal, [className])}
			{...anotherProps}
		>

			<h2 className={cls.RejectedRemoveBookModal__title}>Будь ласка, почекайте!</h2>
			<p className={clsx(cls.RejectedRemoveBookModal__paragraph, [cls.RejectedRemoveBookModal__paragraph_1])}>
				Ви зможете відмінити бронювання лише через <b className={cls.RejectedRemoveBookModal__bold}>{message} хвилину</b>
			</p>
		</Modal>
	);
});
