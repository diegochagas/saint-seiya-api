import React from 'react';
import './Stars.scss';

class Stars extends React.Component {
  render () {
    return (
      <div className="stars">
        <span class="stars-images stars-L"></span>
        <span class="stars-images stars-M"></span>
        <span class="stars-images stars-S"></span>
      </div>
    );
  }
}

export default Stars;