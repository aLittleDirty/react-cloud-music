import React from 'react'
import {
  ListWrapper,
  List,
  ListItem
} from './style'

function RecommendList(props){
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.RecommendList.map((item, index) => {
            return (
              <ListItem>
                <div className="img_wrapper">
                  <img className="img" src={item.picUrl+ "?param=300*300"} width="100%" height="100%"></img>
                  <span className="play_count">{item.playCount}</span>
                </div>
                <p>{item.name}</p>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}


export default React.memo(RecommendList);