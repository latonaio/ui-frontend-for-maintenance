import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Icon} from 'semantic-ui-react';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  }
};

export default class AionHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.logoutButton = this.logoutButton.bind(this);
  }

  logoutButton() {
    if (this.props.auth.loggedIn) {
      return (
        <Button icon labelPosition='left' floated="right" className={"logout-button"}
                onClick={this.props.logoutAndRedirect}>
          <Icon name='sign-out'/>
          ログアウト
        </Button>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="title" color="inherit" style={styles.grow}>
            塗装生産技術 設備保全システム
          </Typography>
          <this.logoutButton/>
        </Toolbar>
      </AppBar>
    );
  }
}
