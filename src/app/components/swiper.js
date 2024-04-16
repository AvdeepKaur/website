"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography } from "antd";

const SwiperFunction = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    if (swiper) {
      swiper.on("slideChange", () => {
        const prev_iframe =
          swiper.slides[swiper.previousIndex]?.querySelector(".sketch");
        if (prev_iframe) prev_iframe.src = "";

        const iframe =
          swiper.slides[swiper.activeIndex]?.querySelector(".sketch");
        if (iframe) iframe.src = iframe.getAttribute("data-src");
      });
    }
  }, []);

  const handleSwiperInit = (swiper) => {
    const iframe = swiper.slides[swiper.activeIndex]?.querySelector(".sketch");
    if (iframe) iframe.src = iframe.getAttribute("data-src");
  };

  return (
    <Swiper
      className="swiper mySwiper"
      ref={swiperRef}
      pagination={{ clickable: true }}
      //navigation
      scrollbar={{ draggable: true }}
      onSwiper={handleSwiperInit}
    >
      <SwiperSlide>
        <img src="title-page.png" alt="Description" width="200" height="150" />
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide-content">
          <img
            src="background.png"
            alt="Description"
            width="200"
            height="150"
          />
          <div className="overlay">
            <iframe
              className="sketch"
              src=""
              data-src="./mandala/index.html"
              width="710"
              height="710"
            />
            <figcaption>
              {" "}
              <Typography level={1}>f1. Mandala</Typography>{" "}
              <p1>
                {" "}
                This sketch aimed to use repetition in order to create an eye
                catching mandala.{" "}
              </p1>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-content">
          <img
            src="background.png"
            alt="Description"
            width="200"
            height="150"
          />
          <div className="overlay">
            <iframe
              className="sketch"
              src=""
              data-src="./let-it-rain/index.html"
              width="600"
              height="500"
            />
            <figcaption>
              {" "}
              <Typography level={1}>f2. let it rain</Typography>{" "}
              <p1>
                {" "}
                This sketch created a little game allowing for users to type in
                words and catch them using their mouse.{" "}
              </p1>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src="background.png" alt="Description" width="200" height="150" />
        <div className="overlay">
          <div className="slide-content">
            <iframe
              className="sketch"
              src=""
              data-src="./hand-tracker/index.html"
              width="640"
              height="500"
            />
            <figcaption>
              {" "}
              <Typography level={1}>f3. hand reactions</Typography>{" "}
              <p1>
                {" "}
                This sketch used ml5.js to track hand movements. It currently is
                able to detect a closed fist, an open hand, and a peace sign!{" "}
              </p1>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src="background.png" alt="Description" width="200" height="150" />
        <div className="overlay">
          <div className="slide-content">
            <iframe
              className="sketch"
              src=""
              data-src="./glasses/index.html"
              width="640"
              height="520"
            />
            <figcaption>
              {" "}
              <Typography level={1}>f4. try on glasses</Typography>{" "}
              <p1>
                {" "}
                This sketch used ml5.js and it's facemesh api in order to allow
                the user to try on two types of glasses.{" "}
              </p1>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperFunction;
