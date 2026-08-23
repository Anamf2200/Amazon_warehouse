export const APP_SETTINGS = {
    API_BASE_URL: "http://localhost:5000",

    API_PATH: {
        USER: {
            login: "http://localhost:5000/api/users/login",
            create: "http://localhost:5000/api/users/register",
            logout: "http://localhost:5000/api/users/logout",

            getAllUsers: "http://localhost:5000/api/users",
            getUser: "http://localhost:5000/api/users",
            updateUser: "http://localhost:5000/api/users",
            remove: "http://localhost:5000/api/users",

            getUsersByTeamLead: "http://localhost:5000/api/users/team-lead",
            changePassword: "http://localhost:5000/api/users/change-password",
        },
    },
};