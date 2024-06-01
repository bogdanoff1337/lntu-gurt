import clsx from "clsx";
import React, {
	FC, ReactNode,
	useCallback,
	useEffect,
} from "react";
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
	const onCloseHandler = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const onClickContent = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	// useEffect(() => {
	// 	document.body.style.overflow = isOpen ? "hidden" : "auto";
	// }, [isOpen]);

	return (
		<Portal>
			<Overlay
				className={cls.Modal}
				isShow={isOpen}
				onClick={onCloseHandler}
				classNames={{
					enter: cls.Modal_enter,
					enterFrom: cls.Modal_enterFrom,
					enterTo: cls.Modal_enterTo,
					leave: cls.Modal_leave,
					leaveFrom: cls.Modal_leaveFrom,
					leaveTo: cls.Modal_leaveTo,
				}}
			>
				<div
					className={clsx(cls.Modal__content, [className])}
					onClick={onClickContent}
				>
					{children}
				</div>
			</Overlay>
		</Portal>
	);
};
