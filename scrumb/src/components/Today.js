import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import UserTasksBoard from './UserTasksBoard';

const SCRUM = [{
  user: {
    id: 1,
    first_name: 'Sirius',
    last_name: 'Dely'
  },
  rotations: [{
    name: 'Yesterday',
    tasks: [{
      id: 1,
      title: 'Texting and response API',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }, {
      id: 2,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }]
  }]
}, {
  user: {
    id: 2,
    first_name: 'Fadil',
    last_name: 'Sethyo'
  },
  rotations: [{
    name: 'Yesterday',
    tasks: [{
      id: 3,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }, {
      id: 4,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }]
  }, {
    name: 'Today',
    tasks: [{
      id: 1,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }, {
      id: 2,
      title: 'Continue 2.8.0 after 2.7.9 release'
    }]
  }, {
    name: 'Needs for Help',
    tasks: [{
      id: 1,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }, {
      id: 2,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }]
  }]
}, {
  user: {
    id: 3,
    first_name: 'Aditya',
    last_name: 'Wibisana'
  },
  rotations: [{
    name: 'Yesterday',
    tasks: [{
      id: 1,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }, {
      id: 2,
      title: 'Focus with Aditya on Releasing 2.7.9',
      description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"'
    }]
  }, {
    name: 'Today',
    tasks: [{
      id: 1,
      title: 'Forever Spinning Bug',
      description: '- Try on Idol 3\n- etc\n- etc\n- etc'
    }, {
      id: 2,
      title: 'Continue 2.8.0 after 2.7.9 release'
    }]
  }]
}];

export default class Today extends React.Component {
  render() {
    return (
      <Container text>
        <Grid celled>
          {
            SCRUM.map(scrum =>
              <UserTasksBoard scrum={ scrum } key={ scrum.user.id } />
            )
          }
        </Grid>
      </Container>
    );
  }
}
