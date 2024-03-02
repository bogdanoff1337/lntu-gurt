import { getMainRoutePath } from "@/shared/config/routes/path";
import BathImage from "../assets/bath.png";
import BedImage from "../assets/bed.png";
import CarriageImage from "../assets/carriage.png";
import PotImage from "../assets/pot.png";
import PuzzlesImage from "../assets/puzzles.png";
import RoomImage from "../assets/room.png";
import { PopularCategoryItemModifier } from "../ui/PopularCategoryItem";

export const popularCategoryModel = [
	{
		id: 0,
		title: "Коляски 2в1",
		to: getMainRoutePath(),
		src: CarriageImage,
		modifier: PopularCategoryItemModifier.GREEN,
	},
	{
		id: 1,
		title: "Дитячі ліжечка",
		to: getMainRoutePath(),
		src: RoomImage,
		modifier: PopularCategoryItemModifier.YELLOW,
	},
	{
		id: 2,
		title: "Горщики",
		to: getMainRoutePath(),
		src: PotImage,
		modifier: PopularCategoryItemModifier.LIGHTBLUE,
	},
	{
		id: 3,
		title: "Пазли",
		to: getMainRoutePath(),
		src: PuzzlesImage,
		modifier: PopularCategoryItemModifier.RED,
	},
	{
		id: 4,
		title: "Ванночки",
		to: getMainRoutePath(),
		src: BathImage,
		modifier: PopularCategoryItemModifier.PURPLE,
	},
	{
		id: 5,
		title: "Дитячя постільна білизна",
		to: getMainRoutePath(),
		src: BedImage,
		modifier: PopularCategoryItemModifier.BLUE,
	},
];
