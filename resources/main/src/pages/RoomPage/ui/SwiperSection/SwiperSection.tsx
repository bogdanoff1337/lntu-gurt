import "swiper/css";
import "swiper/css/pagination";

import clsx from "clsx";
import { FC, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Devices } from "@/shared/const/common";
import { Container } from "@/shared/ui/Container";
import cls from "./SwiperSection.module.scss";

interface SwiperSectionProps {
	className?: string;
	images?: string[];
}

export const SwiperSection: FC<SwiperSectionProps> = ({ className, images }) => {
	const isMobile = useMediaQuery({ maxWidth: Devices.MOBILE });

	const swiperSlidesItems = useMemo(() => {
		return images?.map((image, i) => {
			return (
				<SwiperSlide key={i}>
					<img className={cls.Img} src={`/photos/uploads/room/${image}`} alt="" />
				</SwiperSlide>
			);
		});
	}, [images]);

	return (
		<section className={clsx(cls.SwiperSection, [className])}>
			<Container isDisabled={!isMobile}>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					pagination={{
						clickable: true,
					}}
					centeredSlides
					// loop
					modules={[Pagination]}
					className="mySwiper"
					breakpoints={{

						768: {
							slidesPerView: "auto",
						},
					}}
				>
					{swiperSlidesItems}
				</Swiper>
			</Container>
		</section>
	);
};
