import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { phoneNumberModel } from "../model/phoneNumberModel";
import cls from "./PhoneNumber.module.scss";

interface PhoneNumberProps {
	className?: string
}

export const PhoneNumber: FC<PhoneNumberProps> = ({ className }) => {
	return (
		<a className={classNames(cls.PhoneNumber, {}, [className])} href={phoneNumberModel.content}>
			{phoneNumberModel.content}
		</a>
	);
};
