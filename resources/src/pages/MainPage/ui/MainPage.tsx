import { FC } from "react";
import { Page } from "@/widgets/Page";
import { FacultiesList } from "@/entities/Faculties/";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
// import options from "@/shared/ui/Select/model/data/options.json";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
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
	// $api.get("dormitories")
	// 	.then((response) => {
	// 		setData(response.data.data);
	// 		setSelectedValue(response.data.data[0]);
	// 	});
	// }, []);

	//= ============================================

	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			<Container className={cls.MainPage__container}>
				{/* <RoomsList /> */}
				{/* <FacultList /> */}

				{/* <Select
				options={data}
				selectedValue={selectedValue}
				onSelect={onGurtSelect}
				placeholder="Виберіть гуртожиток"
				// @ts-ignore
				SlotShell={GurtShell}
			/> */}
				{/* <FacultiesList /> */}
			</Container>
		</Page>
	);

	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			<Container className={cls.Header__container}>
				<h1>Головна сторінка</h1>
				{/* <RoomsList /> */}
			</Container>
		</Page>
	);
	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			<Container className={cls.Header__container}>
				<h1>Головна сторінка</h1>
				{/* <Select
				options={data}
				selectedValue={selectedValue}
				onSelect={onGurtSelect}
				placeholder="Виберіть гуртожиток"
				// @ts-ignore
				SlotShell={GurtShell}
			/> */}
			</Container>
		</Page>
	);
};
