import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { ViewCart, ViewComparison, ViewFavorite } from "@/features/Product";
import { ProductSearchField, ToProductSearchField } from "@/features/ProductSearch";
import { Devices } from "@/shared/const/devices";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./ProductsActionsGroup.module.scss";

interface ProductsActionsGroupProps {
	className?: string
}

export const ProductsActionsGroup: FC<ProductsActionsGroupProps> = ({ className }) => {
	const isMobile = useMediaQuery({ maxWidth: Devices.MOBILE });
	return (
		<div className={cn(cls.ProductsActionsGroup, {}, [className])}>
			{isMobile ? <ToProductSearchField /> : <ProductSearchField className={cls.ProductsActionsGroup__search} />}
			<ViewComparison className={cls.ProductsActionsGroup__comparison} />
			<ViewFavorite className={cls.ProductsActionsGroup__favorite} />
			<ViewCart className={cls.ProductsActionsGroup__cart} />
		</div>
	);
};
