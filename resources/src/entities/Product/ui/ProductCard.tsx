import { FC, ReactNode } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button, ButtonModifier } from "@/shared/ui/Button";
import cls from "./ProductCard.module.scss";

interface ProductCardProps {
	id: number;
	className?: string;
	src?: string;
	alt?: string;
	title: string;
	price: number;
	isAvailable?: boolean;
	discountPrice?: number;
	discountPercent?: number;
	SlotActions?: any;
}

export const ProductCard: FC<ProductCardProps> = ({
	className, src, alt, title, SlotActions, price, discountPrice, discountPercent, isAvailable, id,
}) => {
	return (
		<li className={cn(cls.ProductCard, {
			[cls.ProductCard_priceThrought]: !!discountPrice,
		}, [className])}
		>
			<div className={cls.ProductCard__imageWrapper}>
				{discountPercent && <span className={cls.ProductCard__discoutPercent}>-{discountPercent}%</span>}
				<img className={cls.ProductCard__image} src={src} alt={alt} />
			</div>
			<h2 className={cls.ProductCard__title}>{title}</h2>
			<span className={cls.ProductCard__price}>
				<b className={cls.Bold}>{price}</b> грн
			</span>
			{discountPrice && (
				<span className={cls.ProductCard__discountPrice}>
					<b className={cls.Bold}>{discountPrice}</b> грн
				</span>
			)}
			<div className={cls.ProductCard__actions}>
				{isAvailable ? <SlotActions id={id} /> : <span className={cls.ProductCard__isntAvailable}>Немає в наявності</span>}
			</div>
		</li>
	);
};
