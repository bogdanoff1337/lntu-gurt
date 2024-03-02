import { getMainRoutePath } from "@/shared/config/routes/path";

export const navModel = [
	{
		id: 0,
		name: "Про нас",
		to: getMainRoutePath(),
	},
	{
		id: 1,
		name: "Контакти",
		to: getMainRoutePath(),
	},
	{
		id: 2,
		name: "Доставка і оплата",
		secondName: "Оплата і доставка",
		to: getMainRoutePath(),
	},
	{
		id: 3,
		name: "Повернення і обмін",
		to: getMainRoutePath(),
	},
	{
		id: 4,
		isFooter: true,
		name: "Політика конфеденційності",
		to: getMainRoutePath(),
	},
];
