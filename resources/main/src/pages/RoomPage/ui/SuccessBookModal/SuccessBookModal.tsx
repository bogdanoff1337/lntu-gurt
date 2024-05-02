import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import CrossIcon from "../../assets/cross.svg?react";
import cls from "./SuccessBookModal.module.scss";

type TModalProps = Omit<ModalProps, "children">;

interface SuccessBookModalProps extends TModalProps {
	className?: string;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
}

export const SuccessBookModal: FC<SuccessBookModalProps> = ({ className, setIsOpen, isOpen, ...anotherProps }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} className={cn(cls.SuccessBookModal, {}, [className])} {...anotherProps}>
			<button
				aria-label="Close modal"
				className={`${cls.CloseButton} ${cls.SuccessBookModal__closeButton}`}
				onClick={() => setIsOpen(false)}
			>
				<CrossIcon className={cls.CloseButton__icon} />
			</button>

			<h2 className={cls.SuccessBookModal__title}>Наші вітання!</h2>
			<p className={`${cls.SuccessBookModal__paragraph} ${cls.SuccessBookModal__paragraph_1}`}>Ви успішно забронювали кімнату</p>
			<p className={`${cls.SuccessBookModal__paragraph} ${cls.SuccessBookModal__paragraph_2}`}>
				Щоб дізнатись більше інформації, перевірте свою
				<b className={cls.SuccessBookModal__bold}>електронну пошту</b>
			</p>
		</Modal>
	);
};
