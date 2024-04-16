import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Modal, ModalProps } from "@/shared/ui/Modal";
import cls from "./SuccessBookModal.module.scss";


type TModalProps = Omit<ModalProps, "children">;

interface SuccessBookModalProps extends TModalProps {
	className?: string;
}

export const SuccessBookModal: FC<SuccessBookModalProps> = ({ className, ...anotherProps }) => {
	return (
		<Modal className={classNames(cls.SuccessBookModal, {}, [className])} {...anotherProps}>
			1
		</Modal>
	);
};
