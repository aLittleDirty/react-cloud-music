import React, { useEffect, useState } from 'react'
import { SliderContainer } from './style'
import 'swiper/swiper.min.css'
import Swiper, { Autoplay, Pagination } from 'swiper'
Swiper.use([Pagination, Autoplay])

function Slider (props) {
  const [sliderSwiper, setSliderSwiper ] = useState(null);
  const { bannerList } = props;

  // useEffect函数在每次render结束后执行，由于内部内容没有发生变化，就会产生冗余，这时候需要注入依赖。
  // 第二个参数的意思就是注入的外部参数，当参数发生变化时，才执行里面的函数。
  // 由于是做浅比较，如果state是一个对象，对象的指向不发生变化，那么就不会执行effect中的函数
  useEffect(() => {
    if(bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: { el: '.swiper-pagination'},
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
    {/* slider-container和slider-wrapper为固定写法，在使用swiper插件时，需要写此固定写法才能正常轮播 */}
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐"></img>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider);