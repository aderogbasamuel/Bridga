import { useRef } from "react";
import image1 from "../../../assets/gio-rosado-9NrhZlZLsl0-unsplash.jpg";
import image4 from "../../../assets/bruno-kelzer-LvySG1hvuzI-unsplash.jpg";
import image5 from "../../../assets/vladimira-osadnikova-U3aZH0S1YFw-unsplash.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // ✅ TS typing
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-fade";

function SwiperSlider() {
  // ✅ HTML element refs typed correctly
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      <Swiper
        effect="fade"
        modules={[Pagination, Navigation, EffectFade]}
        loop={true}
        className="w-full aspect-square overflow-hidden md:h-screen relative"
        onBeforeInit={(swiper: SwiperType) => {
          // ✅ Assign refs safely
          if (prevRef.current && nextRef.current && paginationRef.current) {
            swiper.params.navigation = {
              ...(swiper.params.navigation as any),
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
            swiper.params.pagination = {
              ...(swiper.params.pagination as any),
              el: paginationRef.current,
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !w-6 !h-6 !rounded-full !border-2 !border-white !flex !items-center !justify-center !mx-1",
              bulletActiveClass:
                "!border-white after:!bg-white text-white",
            };
          }
        }}
      >
        {[image1, image4, image5].map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}

        {/* Pagination inside */}
        <div
          ref={paginationRef}
          className="absolute bottom-4 left-0 right-0 flex justify-center z-20"
        />

        {/* Navigation arrows inside */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-20"
          name="prev"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-20"
          name="next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </Swiper>
    </div>
  );
}

export default SwiperSlider;
