import { USER_REQUEST } from "../actions/utilities";

const INITIAL_STATE = {
    loginLoading: false,
    loginSuccess: false,
    loginFailure: false,
    loginError: null,

    registerLoading: false,
    registerSuccess: false,
    registerFailure: false,
    registerError: null,

    logOutLoading: false,
    logOutSuccess: false,
    logOutFailure: false,
    logOutError: null,

    allUsersLoading: false,
    allUsersSuccess: false,
    allUsersFailure: false,
    allUsersError: false,
    allUsers: null,

    removeLoading: false,
    removeSuccess: false,
    removeFailure: false,
    removeError: null,

    updateLoading: false,
    updateSuccess: false,
    updateFailure: false,
    updateError: null,

    userLoading: false,
    userSuccess: false,
    userFailure: false,
    userError: null,
    user: null,

    createLoading: false,
    createSuccess: false,
    createFailure: false,
    createError: null,

    userByRoleLoading: false,
    userByRoleSuccess: false,
    userByRoleFailure: false,
    userByRoleError: null,
    userByRole: [],

    usersByTeamLeadLoading: false,
    usersByTeamLeadSuccess: false,
    usersByTeamLeadFailure: false,
    usersByTeamLeadError: null,
    usersByTeamLead: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REQUEST.RESET_USER_DATA:
            return {
                ...state,
                userLoading: false,
                userSuccess: false,
                userFailure: false,
                userError: null,
                user: null,
                createLoading: false,
                createSuccess: false,
                createFailure: false,
                createError: null,
            }
        case USER_REQUEST.LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginSuccess: false,
                loginFailure: false,
                loginError: null,
            };
        case USER_REQUEST.LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginSuccess: true,
                loginFailure: false,
                loginError: null,
                user: action.payload,
            };
        case USER_REQUEST.LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginSuccess: false,
                loginFailure: true,
                loginError: action.payload,
            };

        case USER_REQUEST.LOGOUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutSuccess: false,
                logOutFailure: false,
                logOutError: null,
            };
        case USER_REQUEST.LOGOUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutSuccess: true,
                logOutFailure: false,
                logOutError: null,
                user: null,
            };
        case USER_REQUEST.LOGOUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutSuccess: false,
                logOutFailure: true,
                logOutError: action.payload,
            };

        case USER_REQUEST.GET_ALL_USERS_REQUEST:
            return {
                ...state,
                allUsersLoading: true,
                allUsersSuccess: false,
                allUsersFailure: false,
                allUsersError: null,
            };
        case USER_REQUEST.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                allUsersLoading: false,
                allUsersSuccess: true,
                allUsersFailure: false,
                allUsersError: null,
                allUsers: action.payload,
            };
        case USER_REQUEST.GET_ALL_USERS_FAILURE:
            return {
                ...state,
                allUsersLoading: false,
                allUsersSuccess: false,
                allUsersFailure: true,
                allUsersError: action.payload,
            };
        case USER_REQUEST.REMOVE_USER_REQUEST:
            return {
                ...state,
                removeLoading: true,
                removeSuccess: false,
                removeFailure: false,
                removeError: null,
            };
        case USER_REQUEST.REMOVE_USER_SUCCESS:
            return {
                ...state,
                removeLoading: false,
                removeSuccess: true,
                removeFailure: false,
                allUsers: {
                    ...state.allUsers,
                    users: state.allUsers.users.filter(user => user.id !== action.payload.id),
                },
            };
        case USER_REQUEST.REMOVE_USER_FAILURE:
            return {
                ...state,
                removeLoading: false,
                removeSuccess: false,
                removeFailure: true,
                removeError: action.payload,
            };
        case USER_REQUEST.UPDATE_USER_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateSuccess: false,
                updateFailure: false,
                updateError: null,
            };
        case USER_REQUEST.UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                updateSuccess: true,
                updateFailure: false,
                user: action.payload,
            };
        case USER_REQUEST.UPDATE_USER_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateSuccess: false,
                updateFailure: true,
                updateError: action.payload,
            };
        case USER_REQUEST.USER_BY_ROLE_REQUEST:
            return {
                ...state,
                userByRoleLoading: true,
                userByRoleSuccess: false,
                userByRoleFailure: false,
                userByRoleError: null,
            };
        case USER_REQUEST.USER_BY_ROLE_SUCCESS:
            return {
                ...state,
                userByRoleLoading: false,
                userByRoleSuccess: true,
                userByRoleFailure: false,
                userByRoleError: null,
                userByRole: action.payload,
            };
        case USER_REQUEST.USER_BY_ROLE_FAILURE:
            return {
                ...state,
                userByRoleLoading: false,
                userByRoleSuccess: false,
                userByRoleFailure: true,
                userByRoleError: action.payload,
            };

        case USER_REQUEST.GET_USER_REQUEST:
            return {
                ...state,
                userLoading: true,
                userSuccess: false,
                userFailure: false,
                userError: null,
            };
        case USER_REQUEST.GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                userSuccess: true,
                userFailure: false,
                userError: null,
                user: action.payload,
            };
        case USER_REQUEST.GET_USER_FAILURE:
            return {
                ...state,
                userLoading: false,
                userSuccess: false,
                userFailure: true,
                userError: action.payload,
            };

        case USER_REQUEST.CREATE_REQUEST:
            return {
                ...state,
                createLoading: true,
                createSuccess: false,
                createFailure: false,
                createError: null,
            };
        case USER_REQUEST.CREATE_SUCCESS:
            return {
                ...state,
                createLoading: false,
                createSuccess: true,
                createFailure: false,
                createError: null,
            };
        case USER_REQUEST.CREATE_FAILURE:
            return {
                ...state,
                createLoading: false,
                createSuccess: false,
                createFailure: true,
                createError: action.payload,
            };

        case USER_REQUEST.GET_USERS_BY_TEAM_LEAD_REQUEST:
            return {
                ...state,
                usersByTeamLeadLoading: true,
                usersByTeamLeadSuccess: false,
                usersByTeamLeadFailure: false,
                usersByTeamLeadError: null,
            };
        case USER_REQUEST.GET_USERS_BY_TEAM_LEAD_SUCCESS:
            return {
                ...state,
                usersByTeamLeadLoading: false,
                usersByTeamLeadSuccess: true,
                usersByTeamLeadFailure: false,
                usersByTeamLeadError: null,
                usersByTeamLead: action.payload,
            };
        case USER_REQUEST.GET_USERS_BY_TEAM_LEAD_FAILURE:
            return {
                ...state,
                usersByTeamLeadLoading: false,
                usersByTeamLeadSuccess: false,
                usersByTeamLeadFailure: true,
                usersByTeamLeadError: action.payload,
            };

        default:
            return state;
    }
};