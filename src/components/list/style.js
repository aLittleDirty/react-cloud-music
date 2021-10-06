import styled from "styled-components";
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img_wrapper {
    position: relative;
    .play_count {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #FFFFFF;
    }
    .img {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
  }
`;