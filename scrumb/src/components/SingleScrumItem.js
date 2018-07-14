import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const SingleScrumItem = (props) => {
  const { history, scrum } = props;
  return (
    <Card color='teal'
          onClick={ () => history.push(`/scrums/${scrum.id}`) }>

      <Card.Content>
        <Card.Header>{ scrum.title }</Card.Header>
        <Card.Meta>
          <span className='date'>{ scrum['updated_at'] }</span>
        </Card.Meta>
        <Card.Description>{ scrum.description }</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        { scrum['created_at'] }
      </Card.Content>
    </Card>
  );
};

SingleScrumItem.propTypes = {
  history: PropTypes.any.isRequired,
  scrum: PropTypes.any.isRequired
}

export default withRouter(SingleScrumItem);
