import clsx from "clsx";
import { FC } from "react";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./RejectedRemoveBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface RejectedRemoveBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
	message: string;
}

export const RejectedRemoveBookModal: FC<RejectedRemoveBookModalProps> = ({
	className, setIsOpen, isOpen, message, ...anotherProps
}) => {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className={clsx(cls.RejectedRemoveBookModal, [className])}
			{...anotherProps}
		>
			<h2 className={cls.RejectedRemoveBookModal__title}>{message}</h2>
		</Modal>
	);
};
