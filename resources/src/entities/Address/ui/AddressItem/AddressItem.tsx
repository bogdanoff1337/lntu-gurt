import { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AddressItem.module.scss";

interface AddressItemProps {
	className?: string;
	href: string;
	content: ReactNode;
	modifier?: AddressModifier;
	Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export enum AddressModifier {
	BOLD = "AddressItem_bold",
	UNDERLINE = "AddressItem_underline",
}

export const AddressItem: FC<AddressItemProps> = ({
	className, href, content, modifier = "", Icon,
}) => {
	return (
		<li className={classNames(cls.AddressItem, {
			[cls.AddressItem_icon]: !!Icon,
		}, [className, cls[modifier]])}
		>
			<a className={cls.AddressItem__link} href={href} target="_blank" rel="noopener noreferrer">
				{Icon && <Icon className={cls.AddressItem__icon} />}
				{content}
			</a>
		</li>
	);
};
