import { getBookedRoutePath, getLoginRoutePath, getProfileRoutePath } from "@/shared/config/routes/path";
import BedIcon from "../assets/bed.svg?react";
import LogoutIcon from "../assets/logout.svg?react";
import ProfileIcon from "../assets/profile.svg?react";

export const entityMenuModel = [
	{
		id: 1,
		Icon: ProfileIcon,
		name: "Профіль",
		to: getProfileRoutePath(),
	},
	{
		id: 2,
		Icon: BedIcon,
		name: "Заброньовані кімнати",
		to: getBookedRoutePath(),
	},
	{
		id: 3,
		Icon: LogoutIcon,
		name: "Вихід",
		to: getLoginRoutePath(),
	},
];
