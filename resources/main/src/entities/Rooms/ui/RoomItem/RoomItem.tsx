import clsx from "clsx";
import { FC, memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Img } from "@/shared/ui/Img";
import cls from "./RoomItem.module.scss";

interface RoomItemProps {
	className?: string;
	image?: string;
	alt?: string;
	number?: string;
	to?: string;
	status?: Status;
}

enum Status {
	NEW = "new",
	APPROVED = "approved",
	REJECTED = "rejected",
}

export const RoomItem: FC<RoomItemProps> = memo(({
	className, image, alt = "faculty", number, to = "/", status,
}) => {
	const message = useMemo(() => {
		if (status === Status.NEW) {
			return "Очікується";
		}

		if (status === Status.APPROVED) {
			return "Затверджено";
		}

		if (status === Status.REJECTED) {
			return "Відхилено";
		}

		return undefined;
	}, [status]);

	return (
		<li className={clsx(cls.RoomItem, [className])}>
			<NavLink
				className={cls.RoomItem__link}
				to={to}
				state={{
					previousLocationPathname: location.pathname,
					previousLocationSearch: location.search,
				}}
			>
				<Img
					className={{ image: cls.RoomItem__image, skeleton: cls.RoomItem__skeleton }}
					src="https://kartinki.pics/uploads/posts/2022-03/1647619378_1-kartinkin-net-p-petukhi-kartinki-1.jpg"
					alt={alt}
				/>
				{/* {image
					? <Img className={{ image: cls.RoomItem__image, skeleton: cls.RoomItem__skeleton }} src={image} alt={alt} />
					: <div className={cls.RoomItem__image} />} */}
				<h3 className={cls.RoomItem__number}>{number}</h3>
				{status && (
					<p className={clsx(cls.RoomItem__status, cls[`RoomItem__status_${status}`])}>{message}</p>
				)}
			</NavLink>
		</li>
	);
});
