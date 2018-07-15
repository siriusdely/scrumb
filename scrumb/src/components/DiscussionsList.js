import React from 'react';
import { Menu } from 'semantic-ui-react';

import DiscussionElement from './DiscussionElement';

export default class DiscussionsList extends React.Component {
  render = () => {
    const { activeDiscussionId, discussions, handleClick } = this.props;
    return (
      <Menu fluid vertical tabular size='large'>
      {
        discussions && discussions.length ?
        discussions.map(discussion =>
          <DiscussionElement key={ discussion.id }
                             discussion={ discussion } handleClick={ handleClick }
                             active={ activeDiscussionId === discussion.id } />
        ) : null
      }
      </Menu>
    );
  };
}
