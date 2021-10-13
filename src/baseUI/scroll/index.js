import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import BScroll from '@better-scroll/core';
import styled from 'styled-components'


const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Scroll = forwardRef((props, ref) => {
  const [ bScroll, setBScroll ] = useState(); // 实例对象
  const scrollContainerRef = useRef(); // 指向初始化bs实例需要的DOM元素
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullDown, pullUp, onScroll } = props

  // 创建better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(bScroll);
    // 销毁组件时，将BScroll设置为null
    return () => {
      setBScroll(null);
    }
  }, []);

  // 绑定scroll事件
  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.onScroll('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll]);

  // 当pullDown或bScroll发生改变时执行
  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.onScroll('touchEnd', (pos) => {
      if(pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll]);

  // 当pullUp或bScroll发生改变时执行
  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.onScroll('scrollEnd', () => {
      if(bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll]);

  useEffect(() => {
    if(refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 给外界暴露组件方法
  // 该方法和forwardRef一起使用，ref已经在forwardRef中默认传入
  useImperativeHandle (ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0)
      }
    },
    getScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullUpLoading: false,
  pullDown: null,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
}


Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDown: PropTypes.func,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool // 是否支持向下吸顶
}

export default Scroll;