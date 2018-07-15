import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import SingleScrumModal from './SingleScrumModal';

const AddScrumCard = (props) => {
  return (
    <Card link color='grey' >
      <SingleScrumModal modal={ props.modal }
                        scrum={ props.scrum }
                        onModal={ props.onModal }
                        onChange={ props.onChange } />

      <Card.Content textAlign='center'>
        <Card.Header>New Scrum</Card.Header>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <a onClick={ () => { props.onModal(true) } }>
          <Card.Description>
            <Icon name='add' circular size='big'
                  inverted color='teal' />
          </Card.Description>
        </a>
      </Card.Content>
    </Card>
  );
}

export default AddScrumCard;
