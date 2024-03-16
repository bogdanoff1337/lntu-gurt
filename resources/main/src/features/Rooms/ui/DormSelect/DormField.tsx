import { FC } from "react";
import { OptionType } from "@/shared/ui/Select/ui/Select/Select";
import cls from "./style.module.scss";

interface DormFieldProps {
	option?: OptionType;
}

export const DormField: FC<DormFieldProps> = ({ option }) => {
	return (
		<>
			<b className={cls.Option__bold}>{option?.slug}:&nbsp;</b> {option?.address}
		</>

	);
};
