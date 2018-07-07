import React, { Component } from 'react';
import { Button} from 'semantic-ui-react';

export default class DailyNavigationBar extends Component {
  render() {
    return (
      <Button.Group fluid size='big' color='teal'>
        <Button icon='chevron left' labelPosition='left' />
        <Button content='Today' />
        <Button icon='chevron right' labelPosition='right'/>
      </Button.Group>
    );
  }
}
