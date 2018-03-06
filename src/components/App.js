import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {

  state ={
    user: '',
    timeline: []
  }

  onUserChange(e){
    this.setState({
      user: e.target.value
    });
  }

  fetchData(){
    axios.get(window.location.href+'twitter/'+this.state.user)
      .then(res => {
        this.setState({
          timeline: res.data
        })
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <div className="user-input">
          <input type="text" onChange={(e) => this.onUserChange(e)} />
          <button onClick={() => this.fetchData()}>Load</button>
        </div>
        <div className="fetch-result">
          {_.map(this.state.timeline, item => {
            return(
              <div key={item.id} className="item">
                <div>
                  {item.entities.user_mentions && item.entities.user_mentions[0] && item.entities.user_mentions[0].screen_name ?
                    <span>
                      <a href={'https://twitter.com/' + item.entities.user_mentions[0].screen_name}>
                        {item.entities.user_mentions && item.entities.user_mentions[0] && item.entities.user_mentions[0].name ? item.entities.user_mentions[0].name : ''} '@'{item.entities.user_mentions[0].screen_name}
                      </a>
                      {item.created_at}
                    </span>
                  :
                    <span>
                      {item.entities.user_mentions && item.entities.user_mentions[0] && item.entities.user_mentions[0].name ? item.entities.user_mentions[0].name : ''} {item.created_at}
                    </span>
                  }
                </div>
                <div>
                  {item.entities.urls && item.entities.urls[0] && item.entities.urls[0].expanded_url ?
                    <a href={item.entities.urls[0].expanded_url}>
                      {item.text ? item.text : ''}
                      {item.entities.media && item.entities.media[0] && item.entities.media[0].media_url_https ? <img src={item.entities.media[0].media_url_https} /> : ''}
                    </a>
                  :
                    <div>
                      {item.text ? item.text : ''}
                      {item.entities.media && item.entities.media[0] && item.entities.media[0].media_url_https ? <img src={item.entities.media[0].media_url_https} /> : ''}
                    </div>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
