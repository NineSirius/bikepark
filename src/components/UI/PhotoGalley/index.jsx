import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export const PhotoGallery = ({ thumbs }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  if (thumbs) {
    return (
      <>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {thumbs.map((item, index) => {
            return (
              <SwiperSlide key={index} className="swiper-slide">
                <Image
                  src={item.attributes.url}
                  width={item.attributes.width}
                  height={item.attributes.height}
                  alt="Text"
                />
              </SwiperSlide>
            );
          })}
          <div ref={navigationPrevRef}>
            <span className="swiper-prev">
              <i className="icon-arrow-up"></i>
            </span>
          </div>
          <div ref={navigationNextRef}>
            <span className="swiper-next">
              <i className="icon-arrow-down"></i>
                </span>
            </div>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {thumbs.map((item, index) => {
            return (
              <SwiperSlide key={index} className="swiper-slide">
                <Image
                  src={item.attributes.url}
                  width={item.attributes.width}
                  height={item.attributes.height}
                  alt="Text"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  } else {
    return null;
  }
};
