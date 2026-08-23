
import { getAllUsers, getUser, login, create, removeUser, updateUSer, getUsersByTeamLead, } from "../api/userApi";
import { FAILURE, REQUEST, SUCCESS, USER_REQUEST } from "../actions/utilities";
export function LOGIN(userData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.LOGIN_REQUEST));
        login(userData)
            .then(response => {
               
                if (response.data.succeeded === true) {
                    const DASHBOARD = response.data.user;
                    localStorage.setItem('user', JSON.stringify(DASHBOARD));
                    dispatch(SUCCESS(USER_REQUEST.LOGIN_SUCCESS, DASHBOARD));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.LOGIN_FAILURE, response.data.message));
                    if (failure) {
                        failure();
                    }
                }
            })
            .catch(error => {
                dispatch(FAILURE(USER_REQUEST.LOGIN_FAILURE, error.message));
                if (failure) {
                    failure();
                }
            });
    };
}
export const LOGOUT = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_REQUEST.LOGOUT_REQUEST });
            await new Promise(resolve => setTimeout(resolve, 200));
            localStorage.removeItem('user');
            dispatch({ type: USER_REQUEST.LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: USER_REQUEST.LOGOUT_FAILURE, payload: error.message });
        }
    };
};
export function CREATEUSER(userData, moveToNext, failure) {
    return async dispatch => {
        dispatch(REQUEST(USER_REQUEST.CREATE_REQUEST));
        create(userData).then(response => {
            if (response.data.succeeded === true) {

                dispatch(SUCCESS(USER_REQUEST.CREATE_SUCCESS, response.data.data));
                if (moveToNext) {
                    moveToNext();
                }
            } else {
                dispatch(FAILURE(USER_REQUEST.CREATE_FAILURE, response.data.message));
                if (failure) {
                    failure();
                }
            }
        })
            .catch(error => {
                dispatch(FAILURE(USER_REQUEST.CREATE_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            });
    };
};
export function GETALLUSERS(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_ALL_USERS_REQUEST));
        getAllUsers(data, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_ALL_USERS_SUCCESS, response.data.data));
                } else {
                    dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function GETUSER(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_USER_REQUEST));
        getUser(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(USER_REQUEST.GET_USER_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext(response.data.data)
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.GET_USER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.GET_USER_FAILURE, error.message));
                if (failure) {
                    failure(error.message);
                }
            }
        );
    };
};

export function GETUSERSBYTEAMLEAD(teamLeadId, data, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_ALL_USERS_REQUEST));

        getUsersByTeamLead(teamLeadId, data).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_ALL_USERS_SUCCESS, response.data.data));

                } else {
                    dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, error.message));
                if (failure) {
                    failure(error.message);
                }
            }
        );
    };
};

export function REMOVEUSER(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.REMOVE_USER_REQUEST));
        removeUser(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(USER_REQUEST.REMOVE_USER_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.REMOVE_USER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.REMOVE_USER_FAILURE, error.message));
                if (failure) {
                    failure(error.message);
                }

            }
        );
    };
}
export function UPDATEUSER(userId, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.UPDATE_USER_REQUEST));
        updateUSer(userId).then(
            response => {
                if (response.data.succeeded) {

                    dispatch(SUCCESS(USER_REQUEST.UPDATE_USER_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.UPDATE_USER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.UPDATE_USER_FAILURE, error.message));
                if (failure) {
                    failure(error.message);
                }
            }
        );
    };
};