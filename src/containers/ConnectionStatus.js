import {connect} from 'react-redux';
import ConnectionStatus from "../views/ConnectionStatus";
import {fetchDevices} from "../actions/device.actions";


const mapStateToProps = (state, _) => ({
  device: state.device,
});

const mapDispatchToProps = dispatch => ({
  fetchDevices() {
    dispatch(fetchDevices());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionStatus);
