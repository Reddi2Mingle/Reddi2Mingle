import React from 'react';
import { connect } from 'react-redux';

export default () => (
  <div>
    <h1>Think this redditor's hot?</h1>
    <img src="https://scontent.xx.fbcdn.net/v/t1.0-9/621_587359599669_2374_n.jpg?oh=d27ee8341201840fab85bd7e9fafe8df&oe=58554BA7" style={{display: "block"}}/>
    <button type="submit" style={{ border: 0, background: "transparent", display: "inline-block" }}>
      <img src="http://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png" width="50" height="50" />
    </button>
    <button type="submit" style={{ border: 0, background: "transparent", display: "inline-block" }}>
      <img src="http://www.clker.com/cliparts/k/m/w/n/Q/D/green-heart-md.png" width="50" height="50" />
    </button>
  </div>
);
