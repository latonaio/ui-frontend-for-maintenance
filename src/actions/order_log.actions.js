import {orderLogConstants} from '../constants';
import {orderLogService} from '../services/order_log.service';

export const getOrderLog = () => {
  return dispatch => {
    dispatch(getOrderLogRequest());

    orderLogService.getOrderLog()
      .then(
        data => {
          dispatch(getOrderLogSuccess(data));
        },
        error => {
          dispatch(getOrderLogFailure(error));
        }
      );
  };
};


const getOrderLogRequest = () => ({
  type: orderLogConstants.GET_ORDER_LOG_REQUEST
});
const getOrderLogSuccess = data => ({
  type: orderLogConstants.GET_ORDER_LOG_SUCCESS,
  payload: data
});
const getOrderLogFailure = error => ({
  type: orderLogConstants.GET_ORDER_LOG_FAILURE,
  payload: error
});
