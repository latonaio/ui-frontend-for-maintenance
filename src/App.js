import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import Login from './containers/Login';
import WaveChart from "./containers/WaveChart";
import TimeChart from "./containers/TimeChart";
import Alarm from "./containers/Alarm";
import EventLog from "./containers/EventLog";
import DataBackup from "./containers/DataBackup";
import OffsetResult from "./containers/OffsetResult";
import OperationTime from "./containers/OperationTime";
import SoftwareVersion from "./containers/SoftwareVersion";
import OrderLog from "./containers/OrderLog";
import JobScheduler from "./containers/JobScheduler";
import JtektAlarm from "./containers/JtektAlarm";
import ConnectionStatus from "./containers/ConnectionStatus";

import {PrivateRoute} from "./components/PrivateRoute";
// font awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCameraRetro,
  faCaretRight,
  faCheckSquare,
  faCircle,
  faCogs,
  faCut,
  faFileExport,
  faHandPointer,
  faSave,
  faSignOutAlt,
  faStop,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCameraRetro,
  faCheckSquare,
  faCogs,
  faFileExport,
  faHandPointer,
  faSave,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faStop,
  faCut,
  faTimes,
  faCaretRight,
  faCircle,
  faSignOutAlt,
);


const YASKAWA_MAKER_ID = 1;
const JTEKT_MAKER_ID = 2;
// const KEYENCE_MAKER_ID = 3;
const OMRON_MAKER_ID = 4;
const MITSUBISHI_MAKER_ID = 5;


const styles = {
  root: {
    flexGrow: 1,
  },
};

// TODO URLをYaskawaとJtect用で完全に分離する
class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          {/*Yaskawa*/}
          <PrivateRoute path="/Yaskawa/TimeChart" component={TimeChart} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/WaveChart" component={WaveChart} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/Alarm" component={Alarm} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/EventLog" component={EventLog} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/OffsetResult" component={OffsetResult} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/OperationTime" component={OperationTime} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/SoftwareVersion" component={SoftwareVersion} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/OrderLog" component={OrderLog} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/DataBackup/" component={DataBackup} makerID={YASKAWA_MAKER_ID}/>
          <PrivateRoute path="/Yaskawa/JobScheduler" component={JobScheduler} makerID={YASKAWA_MAKER_ID}/>

          {/*JTECT*/}
          <PrivateRoute path="/Jtekt/Alarm" component={JtektAlarm} makerID={JTEKT_MAKER_ID}/>

          {/*オムロン*/}
          <PrivateRoute path="/Omron/DataBackup/" component={DataBackup} makerID={OMRON_MAKER_ID}/>
          <PrivateRoute path="/Omron/JobScheduler" component={JobScheduler} makerID={OMRON_MAKER_ID}/>

          {/*MITSUBISHI*/}
          <PrivateRoute path="/Mitsubishi/DataBackup/" component={DataBackup} makerID={MITSUBISHI_MAKER_ID}/>
          <PrivateRoute path="/Mitsubishi/JobScheduler" component={JobScheduler} makerID={MITSUBISHI_MAKER_ID}/>

          {/*接続機器*/}
          <PrivateRoute path="/ConnectionStatus" component={ConnectionStatus} makerID={null}/>

          <Route path="/" exact={true} component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
