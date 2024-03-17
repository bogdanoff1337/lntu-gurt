import "swiper/css";
import "swiper/css/pagination";

import { FC, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import cls from "./SwiperSection.module.scss";

interface SwiperSectionProps {
	className?: string;
	photos: string[]

}

export const SwiperSection: FC<SwiperSectionProps> = ({ className, photos }) => {
	const isMobile = useMediaQuery({ maxWidth: Devices.MOBILE });

	const swiperSlidesItems = useMemo(() => {
		return photos.map((photo) => {
			return (
				<SwiperSlide>
					<img className={cls.Img} src={photo} alt="" />
				</SwiperSlide>
			);
		});
	}, [photos]);

	return (
		<section className={cn(cls.SwiperSection, {}, [className])}>
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
