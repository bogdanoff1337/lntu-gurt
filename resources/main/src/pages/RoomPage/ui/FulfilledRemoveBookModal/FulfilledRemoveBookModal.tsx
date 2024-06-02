import clsx from "clsx";
import { FC } from "react";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./FulfilledRemoveBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface FulfilledRemoveBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
}

export const FulfilledRemoveBookModal: FC<FulfilledRemoveBookModalProps> = ({
	className, setIsOpen, isOpen, ...anotherProps
}) => {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className={clsx(cls.FulfilledRemoveBookModal, [className])}
			{...anotherProps}
		>
			<h2 className={cls.FulfilledRemoveBookModal__title}>Наші вітання!</h2>
			<p className={clsx(cls.FulfilledRemoveBookModal__paragraph, [cls.FulfilledRemoveBookModal__paragraph_1])}>Ви успішно відмінили бронювання кімнати</p>
			<p className={clsx(cls.FulfilledRemoveBookModal__paragraph, [cls.FulfilledRemoveBookModal__paragraph_2])}>
				Щоб дізнатись більше інформації, перевірте свою
				<b className={cls.FulfilledRemoveBookModal__bold}>електронну пошту</b>
			</p>
		</Modal>
	);
};
