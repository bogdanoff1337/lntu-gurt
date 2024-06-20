import clsx from "clsx";
import React, {
	FC, ReactNode,
	memo,
	useCallback,
	useEffect,
} from "react";
import { Overlay } from "../../Overlay";
import { Portal } from "../../Portal";
import CrossIcon from "../assets/cross.svg?react";
import cls from "./Modal.module.scss";

export interface ModalProps {
	className?: string;
	setIsOpen: (oppened: boolean) => void;
	children: ReactNode;
	isOpen: boolean;
}

export const Modal: FC<ModalProps> = memo(({
	className, setIsOpen, isOpen, children,
}) => {
	const onCloseHandler = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const onClickContent = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(cls.overflowHidden);
		} else {
			document.body.classList.remove(cls.overflowHidden);
		}
	}, [isOpen]);

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
					<button
						aria-label="Close modal"
						className={clsx(cls.CloseButton, [cls.Modal__closeButton])}
						onClick={() => setIsOpen(false)}
					>
						<CrossIcon className={cls.CloseButton__icon} />
					</button>
					{children}
				</div>
			</Overlay>
		</Portal>
	);
});
