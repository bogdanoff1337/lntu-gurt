import { FC, useCallback } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import cls from "./CatalogItem.module.scss";

interface CatalogItemButtonProps {
	className?: string;
	name: string;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
	onClick: any;
}

export const CatalogItemButton: FC<CatalogItemButtonProps> = ({
	className, Icon, name, onClick,
}) => {
	return (
		<li className={cn(cls.CatalogItem, {}, [className])}>
			<Button onClick={onClick} className={cls.CatalogItem__button}>
				<Icon />
				{name}
			</Button>
		</li>
	);
};
