import React from 'react';

let D = React.DOM;

export default React.createClass({
  displayName: "HomePage",

  render() {
    return (
      <div className="home-page">
        <h1 className="home-title">Namely Styleguide FTW</h1>
      </div>
      );
  }
});
