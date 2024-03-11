import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ButtonTheme } from "@/shared/ui/Button/styles/const";
import { Button } from "@/shared/ui/Button/ui/Button";
import { Input } from "@/shared/ui/Input/Input";
import cls from "./OrderPage.module.scss";

interface OrderPageProps {
	className?: string;
}

export const OrderPage: FC<OrderPageProps> = ({ className }) => {
	return (
		<div className={classNames(cls.OrderPage, {}, [className])}>
			<h1 className={cls.OrderPage__title}>Бронювання кімнати 721</h1>
			<div className={cls.OrderPage__wrapper}>
				<Input className={cls.OrderPage__input} placeholder="Вкажіть прізвище" />
				<Input className={cls.OrderPage__input} placeholder="Вкажіть ім’я" />
				<Input className={cls.OrderPage__input} placeholder="Вкажіть по батькові" />
				<Input className={cls.OrderPage__input} placeholder="Стать" />
				<Input className={cls.OrderPage__input} placeholder="Місце проживання" />
				<Input className={cls.OrderPage__input} placeholder="Номер телефону" />
				<Input className={cls.OrderPage__input} placeholder="Вкажіть пільгу" />
			</div>
			<Button
				className={cls.OrderPage__button}
				theme={ButtonTheme.OUTLINE}
			>
				Забронювати
			</Button>
		</div>
	);
};
