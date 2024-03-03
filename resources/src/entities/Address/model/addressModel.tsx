import LocationIcon from "../assets/location.svg";
import { AddressModifier } from "../ui/AddressItem/AddressItem";

export const addressModel = [
	{
		id: 0,
		content: "(063) 128-46-09",
		href: "tel:+380631284609",
		modifier: AddressModifier.BOLD,
	},
	{
		id: 1,
		content: "bubu.shop2018@gmail.com",
		href: "mailto:bubu.shop2018@gmail.com",
		modifier: AddressModifier.UNDERLINE,
	},
	{
		id: 2,
		Icon: LocationIcon,
		content: <><span>Одеса, вул. Михайлівська 8</span> <span>(щодня з 10:00 до 20:00)</span></>,
		secondContent: "Одеса, вул. Михайлівська, 8 (10:00-19:00 щодня)",
		href: "https://www.google.com/maps/place/Marazliivska+St,+8,+Odesa,+Odes'ka+oblast,+65000/@46.4826311,30.7503513,17z/data=!3m1!4b1!4m6!3m5!1s0x40c631a1cb623b4b:0xf221dfdbe11dfa6!8m2!3d46.4826311!4d30.7503513!16s%2Fg%2F1tcxyb36?entry=ttu",
	},
];
