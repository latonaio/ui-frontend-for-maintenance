import {connect} from 'react-redux';
import {getSoftVersion} from "../actions";
import SoftwareVersion from "../views/SoftwareVersion";


const mapStateToProps = (state, _) => ({
  software_version: state.software_version,
});

const mapDispatchToProps = dispatch => ({
  getSoftVersion() {
    dispatch(getSoftVersion());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SoftwareVersion);
