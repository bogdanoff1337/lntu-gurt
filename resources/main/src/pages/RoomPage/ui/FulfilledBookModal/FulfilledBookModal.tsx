import clsx from "clsx";
import { FC, memo } from "react";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./FulfilledBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface FulfilledBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
}

export const FulfilledBookModal: FC<FulfilledBookModalProps> = memo(({
	className, setIsOpen, isOpen, ...anotherProps
}) => {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className={clsx(cls.FulfilledBookModal, [className])}
			{...anotherProps}
		>
			<h2 className={cls.FulfilledBookModal__title}>Наші вітання!</h2>
			<p className={clsx(cls.FulfilledBookModal__paragraph, [cls.FulfilledBookModal__paragraph_1])}>Ви успішно забронювали кімнату</p>
			<p className={clsx(cls.FulfilledBookModal__paragraph, [cls.FulfilledBookModal__paragraph_2])}>
				Щоб дізнатись більше інформації, перевірте свою
				<b className={cls.FulfilledBookModal__bold}>електронну пошту</b>
			</p>
		</Modal>
	);
});
