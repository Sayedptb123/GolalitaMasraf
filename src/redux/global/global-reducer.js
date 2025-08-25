import { LOCATION_STATUSES } from '../../hooks/useUserLocation';
import { GLOBAL_SET_USER_LOCATION } from './global-types';

const initialState = {
  location: {
    coordinates: {},
    status: LOCATION_STATUSES.NOT_REQUESTED,
  },
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_SET_USER_LOCATION:
      return {
        ...state,
        location: { coordinates: action.coordinates, status: action.status },
      };

    default:
      return state;
  }
};
