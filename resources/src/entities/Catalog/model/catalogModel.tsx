import { getBabyCarriageRoutePath, getMainRoutePath } from "@/shared/config/routes/path";
import AutoChairIcon from "../assets/autochair.svg";
import CarIcon from "../assets/car.svg";
import CarriageIcon from "../assets/carriage.svg";
import ChairIcon from "../assets/chair.svg";
import ClothesIcon from "../assets/clothes.svg";
import FeadingIcon from "../assets/feeding.svg";
import NewIcon from "../assets/new.svg";
import RoomIcon from "../assets/room.svg";
import SoapIcon from "../assets/soap.svg";
import ToyIcon from "../assets/toy.svg";

export const catalogModel = [
	{
		id: 0,
		Icon: CarriageIcon,
		name: "Дитячі коляски",
		category: [
			"Коляски 2 в 1",
			"Зимові конверти",
			"Аксесуари та комплектуючі",
			"Муфти",
		],
		to: getBabyCarriageRoutePath(),
	},
	{
		id: 1,
		Icon: RoomIcon,
		name: "Дитяча кімната",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 2,
		Icon: ChairIcon,
		name: "Стільці і шезлонги",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 3,
		Icon: FeadingIcon,
		name: "Для годування",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 4,
		Icon: SoapIcon,
		name: "Гігієна і догляд",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 5,
		Icon: AutoChairIcon,
		name: "Автокрісла",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 5,
		Icon: CarIcon,
		name: "Дитячий транспорт",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 6,
		Icon: ToyIcon,
		name: "Іграшки",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 7,
		Icon: ClothesIcon,
		name: "Одяг",
		category: [

		],
		to: getMainRoutePath(),
	},
	{
		id: 8,
		Icon: NewIcon,
		name: "Новий товар",
		category: [

		],
		to: getMainRoutePath(),
	},
];
