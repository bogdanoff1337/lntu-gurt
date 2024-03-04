import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Page } from "@/widgets/Page";
import { $api } from "@/shared/api/api";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
// import options from "@/shared/ui/Select/model/data/options.json";
import { OptionType } from "@/shared/ui/Select/model/types/types";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

const GurtShell: FC<OptionType> = ({ data }) => {
	return (
		<>
			<span className={cls.Option__dorm}>{data.slug}:</span>
			<span>{data.address}</span>
		</>
	);
};

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const [data, setData] = useState([]);

	const onGurtSelect = (value: string) => {
		setSelectedValue(value);
	};

	useEffect(() => {
		$api.get("dormitories")
			.then((response) => {
				setData(response.data.data);
				setSelectedValue(response.data.data[0]);
			});
	}, []);

	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			MainPage
			<Select
				options={data}
				selectedValue={selectedValue}
				onSelect={onGurtSelect}
				placeholder="Виберіть гуртожиток"
				// @ts-ignore
				SlotShell={GurtShell}
			/>
		</Page>
	);
};
