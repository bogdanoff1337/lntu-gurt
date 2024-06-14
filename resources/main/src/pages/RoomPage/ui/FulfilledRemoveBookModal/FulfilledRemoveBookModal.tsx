import clsx from "clsx";
import { FC, memo } from "react";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./FulfilledRemoveBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface FulfilledRemoveBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
}

export const FulfilledRemoveBookModal: FC<FulfilledRemoveBookModalProps> = memo(({
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
			<p className={clsx(cls.FulfilledRemoveBookModal__paragraph, [cls.FulfilledRemoveBookModal__paragraph_1])}>
				Ви успішно <mark className={cls.FulfilledRemoveBookModal__mark}>відмінили</mark> бронювання кімнати
			</p>
			<p className={clsx(cls.FulfilledRemoveBookModal__paragraph, [cls.FulfilledRemoveBookModal__paragraph_2])}>
				Ви зможете подати заявку на бронювання ще на
				<b className={cls.FulfilledRemoveBookModal__bold}>2 кімнати</b>
			</p>
		</Modal>
	);
});
