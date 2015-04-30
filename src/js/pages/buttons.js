import React from 'react';
import Styleguide from '../styleguide';
import Button from '../components/button';

export default React.createClass({
  displayName: "ButtonsPage",

  render() {
    return <Styleguide title="Button Styles">

      <div title="Base" description="The button styles for Namely app">
        <Button label="Base" />
      </div>

      <div title="Types">
        <Button label=".button" />
        <Button label=".button-secondary" type="secondary" />
        <Button label=".button-danger" type="danger" />
        <Button label=".button:disabled" disabled={ true } />
      </div>

      <div title="Sizes">
        <Button label="Default Size" />
        <Button label=".button-sm" size="sm" />
        <Button label=".button-sm.button-danger" size="sm" type="danger" />
        <Button label=".button-sm:disabled" size="sm" disabled={ true } />
      </div>
    </Styleguide>
  }
});
