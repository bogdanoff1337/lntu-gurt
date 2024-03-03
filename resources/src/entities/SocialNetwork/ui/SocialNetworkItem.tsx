import { FC, memo } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./SocialNetworkItem.module.scss";

interface SocialNetworkItemProps {
	className?: string;
	Icon: FC<React.SVGProps<SVGSVGElement>>
	href: string;

}

export const SocialNetworkItem: FC<SocialNetworkItemProps> = memo(({ className, Icon, href }) => {
	return (
		<li className={cn(cls.SocialNetworkItem, {}, [className])}>
			<a className={cls.SocialNetworkItem__link} href={href} target="_blank" rel="noreferrer">
				<Icon className={cls.SocialNetworkItemItem__icon} />
			</a>
		</li>
	);
});
