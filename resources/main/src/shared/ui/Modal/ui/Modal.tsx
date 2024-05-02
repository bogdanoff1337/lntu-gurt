import { Transition } from "@headlessui/react";
import React, {
	FC, ReactNode,
} from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import { Overlay } from "../../Overlay";
import { Portal } from "../../Portal";
import cls from "./Modal.module.scss";

export interface ModalProps {
	className?: string;
	setIsOpen: (oppened: boolean) => void;
	children: ReactNode;
	isOpen: boolean;
}

export const Modal: FC<ModalProps> = ({
	className, setIsOpen, isOpen, children,
}) => {
	const onCloseHandler = () => {
		setIsOpen(false);
	};

	const onClickContent = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Portal>
			<Overlay className={cls.Modal} isShow={isOpen} onClick={onCloseHandler} classNames={{
				enter: cls.Modal_enter,
				enterFrom: cls.Modal_enterFrom,
				enterTo: cls.Modal_enterTo,
				leave: cls.Modal_leave,
				leaveFrom: cls.Modal_leaveFrom,
				leaveTo: cls.Modal_leaveTo,
			}}>
				<div
					className={cn(cls.Modal__content, {}, [className])}
					onClick={onClickContent}
				>
					{children}
				</div>
			</Overlay>
		</Portal>
	);
};
