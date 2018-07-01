import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';
import UserTasksBoard from './UserTasksBoard';

export default class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._todayState();
  }

  _todayState() {
    return {
      today: ScrumStore.today
    };
  }

  _todayChange() {
    this.setState(this._todayState());
  }

  componentDidMount() {
    this.todayChange = this._todayChange.bind(this);
    ScrumStore.addChangeListener(this.todayChange);
    ScrumService.getToday(1);
  }

  render() {
    let { today } = this.state;
    return (
      <Container text>
        <Grid celled>
          {
            today && today.users && today.users.length ?
            today.users.map(
              user =>
                <UserTasksBoard user={ user } key={ user.id } />
            ) : null
          }
        </Grid>
      </Container>
    );
  }
}

/*
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

const TODAY = {
  "created_at": "2018-07-01T00:55:45.461Z",
  "scrum": {
    "id": 1,
    "title": "VoicePing Devs Work Log",
    "description": "Daily Stand-up Meeting for VoicePing Developers Scrum"
  },
  "rotations": [{
    "id": 1,
    "task": {
      "id": 1,
      "title": "Texting and response API",
      "owner": {
        "id": 2,
        "email": "sirius@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/e647bb7ff35d4fdf332f6160ae26e4d4?d=robohash&s=60"
      }
    }
  }, {
    "id": 2,
    "task": {
      "id": 2,
      "title": "Focus with Aditya on Releasing 2.7.9",
      "owner": {
        "id": 3,
        "email": "fadil@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/aa230296a383dedeb0cc4bae1df6c47f?d=robohash&s=60"
      }
    }
  }, {
    "id": 3,
    "task": {
      "id": 3,
      "title": "Forever Spinning Bug",
      "owner": {
        "id": 4,
        "email": "aditya@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/46bbe54ac11f71d02dc5f140adf71206?d=robohash&s=60"
      }
    }
  }, {
    "id": 4,
    "task": {
      "id": 4,
      "title": "Continue 2.8.0 after 2.7.9 release",
      "owner": {
        "id": 3,
        "email": "fadil@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/aa230296a383dedeb0cc4bae1df6c47f?d=robohash&s=60"
      }
    }
  }, {
    "id": 5,
    "task": {
      "id": 5,
      "title": "max time",
      "owner": {
        "id": 4,
        "email": "aditya@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/46bbe54ac11f71d02dc5f140adf71206?d=robohash&s=60"
      }
    }
  }, {
    "id": 6,
    "task": {
      "id": 6,
      "title": "copy paste long text",
      "owner": {
        "id": 4,
        "email": "aditya@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/46bbe54ac11f71d02dc5f140adf71206?d=robohash&s=60"
      }
    }
  }, {
    "id": 7,
    "task": {
      "id": 7,
      "title": "Chrome upload",
      "owner": {
        "id": 3,
        "email": "fadil@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/aa230296a383dedeb0cc4bae1df6c47f?d=robohash&s=60"
      }
    }
  }, {
    "id": 8,
    "task": {
      "id": 8,
      "title": "Review AW's PR",
      "owner": {
        "id": 3,
        "email": "fadil@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/aa230296a383dedeb0cc4bae1df6c47f?d=robohash&s=60"
      }
    }
  }, {
    "id": 9,
    "task": {
      "id": 9,
      "title": "3 pending Staging test",
      "owner": {
        "id": 2,
        "email": "sirius@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/e647bb7ff35d4fdf332f6160ae26e4d4?d=robohash&s=60"
      }
    }
  }, {
    "id": 10,
    "task": {
      "id": 10,
      "title": "Start work on Task management in VP",
      "owner": {
        "id": 2,
        "email": "sirius@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/e647bb7ff35d4fdf332f6160ae26e4d4?d=robohash&s=60"
      }
    }
  }, {
    "id": 11,
    "task": {
      "id": 11,
      "title": "iOS DC every 2 minutes",
      "owner": {
        "id": 2,
        "email": "sirius@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/e647bb7ff35d4fdf332f6160ae26e4d4?d=robohash&s=60"
      }
    }
  }, {
    "id": 12,
    "task": {
      "id": 12,
      "title": "install NewRelic Infrastructure Monitoring",
      "owner": {
        "id": 2,
        "email": "sirius@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/e647bb7ff35d4fdf332f6160ae26e4d4?d=robohash&s=60"
      }
    }
  }, {
    "id": 13,
    "task": {
      "id": 13,
      "title": "[Everyone] Scrum - Playstore debug APK?",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 14,
    "task": {
      "id": 14,
      "title": "Not joining Scrum. Travelling in Malaysia for meeting",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 15,
    "task": {
      "id": 15,
      "title": "[Everyone] Please read above",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 16,
    "task": {
      "id": 16,
      "title": "[FD/AW] standby as updating taxi (100 users) at 1130",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 17,
    "task": {
      "id": 17,
      "title": "[AW] Please make latest release builds for all versions",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 18,
    "task": {
      "id": 18,
      "title": "Test Intranet APK with intranet server",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }, {
    "id": 19,
    "task": {
      "id": 19,
      "title": "[HB/SR] iOS testing with production server to ensure no problem on server",
      "owner": {
        "id": 1,
        "email": "wenhan@voiceping.com",
        "avatar_url": "//www.gravatar.com/avatar/0ec464bd80d0db9c6308674a3a8b26ce?d=robohash&s=60"
      }
    }
  }]
}
*/
