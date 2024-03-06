import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Page } from "@/widgets/Page";
import {
	fetchRooms, getRoomsData,
} from "@/entities/Room";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
// import options from "@/shared/ui/Select/model/data/options.json";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

// const GurtShell: FC<OptionType> = ({ data }) => {
// 	return (
// 		<>
// 			<span className={cls.Option__dorm}>{data.slug}:</span>
// 			<span>{data.address}</span>
// 		</>
// 	);
// };

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(fetchDormitories());
	// }, [dispatch]);
	//= =================================================

	// const [selectedValue, setSelectedValue] = useState<string | null>(null);

	// const [data, setData] = useState([]);

	// const onGurtSelect = (value: string) => {
	// 	setSelectedValue(value);
	// };

	// useEffect(() => {
	// 	$api.get("dormitories")
	// 		.then((response) => {
	// 			setData(response.data.data);
	// 			setSelectedValue(response.data.data[0]);
	// 		});
	// }, []);

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch]);

	const data = useSelector(getRoomsData);
	console.log(data);

	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			MainPage
			{/* <Select
				options={data}
				selectedValue={selectedValue}
				onSelect={onGurtSelect}
				placeholder="Виберіть гуртожиток"
				// @ts-ignore
				SlotShell={GurtShell}
			/> */}
		</Page>
	);
};
