"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

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
      <SwiperSlide style={{ width: "700px", height: "800px" }}>
        <img src="title-page.png" alt="Description" width="200" height="150" />
      </SwiperSlide>

      <SwiperSlide style={{ width: "800px", height: "800px" }}>
        <div className="slide-content">
          <img src="background.png" alt="Description" />
          <div className="overlay">
            <iframe
              className="sketch"
              src=""
              data-src="./mandala/index.html"
              width="700"
              height="700"
            />
            <figcaption>
              {" "}
              <Title level={3}>f1. kaleidoscope</Title>
              <Text mark>
                In this sketch, the canvas is translated to its center, and then
                rotated based on the frame count. Within a loop, shapes are
                drawn with symmetry around a central point. Colors are applied
                based on a predefined palette, with variations introduced by
                random selection. Rectangles, triangles, and circles are drawn
                to form intricate patterns. The result is an mesmerizing display
                of geometric shapes and colors, reminiscent of a kaleidoscope.
              </Text>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide style={{ width: "700px", height: "800px" }}>
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
              height="525"
            />
            <figcaption>
              <Title level={3}>f2. let the words rain</Title>
              <Text mark>
                This sketch creates a scene where letters rain down from the sky
                and users can catch them with a basket. The letters fall at
                intervals, forming words input by the user or randomly selected
                from the alphabet. As the letters cascade, they respond to
                gravity until caught by the basket. The background features
                clouds, adding to the atmosphere.
              </Text>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide style={{ width: "700px", height: "800px" }}>
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
              <Title level={3}>f1. hand movements</Title>
              <Text mark>
                In this sketch, I used the ml5.js library to create a
                hand-tracking application. It uses a webcam feed to detect and
                track hand gestures, specifically focusing on recognizing fists,
                peace signs, and open hands. Thus, provides real-time feedback
                on hand gestures.
              </Text>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide style={{ width: "700px", height: "800px" }}>
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
              <Title level={3}>f1. try on glasses</Title>
              <Text mark>
                This sketch also utilizes the ml5.js library to create a fun
                application that features a playful way to try on virtual
                glasses in real-time using a webcam, offering users an
                interactive and entertaining experience.
              </Text>
            </figcaption>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperFunction;