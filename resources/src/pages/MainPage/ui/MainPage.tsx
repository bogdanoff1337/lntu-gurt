import { FC, useState } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import options from "@/shared/ui/Select/model/data/options.json";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const onGurtSelect = (value: string) => {
		setSelectedValue(value);
		console.log(selectedValue);
	};

	// const selectedGurt = options.find((item) => item.value === gurt);

	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			MainPage
			<Select
				options={options}
				selectedValue={selectedValue}
				onSelect={onGurtSelect}
				placeholder="Виберіть гуртожиток"
			/>
		</Page>
	);
};
