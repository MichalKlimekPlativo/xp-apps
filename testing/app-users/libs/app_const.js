/**
 * Created  on 15.09.2017.
 */
module.exports = Object.freeze({
    USER_STORE: 'User Store',
    ROLE: 'Role',
    ROLES: 'Roles',
    GROUP: 'Group',
    USER: 'User',
    USER_GROUP: 'User Group',
    CREATE_NEW_HEADER: 'Create New',
    SUPER_USER: 'Super User',
    USER_WIZARD_PASS_MESSAGE: 'Password can not be empty.',
    USER_WIZARD_EMAIL_MESSAGE: 'Email can not be empty.',
    USER_WIZARD_EMAIL_IS_INVALID: 'Email is invalid.',
    USER_WAS_CREATED_MESSAGE: 'User was created',
    roles: {
        CM_ADMIN: 'Content Manager Administrator',
        ADMIN_CONSOLE: 'Administration Console Login',
        CM_APP: 'Content Manager App',
        ADMINISTRATOR: 'Administrator',
        USERS_APP: 'Users App',
        AUTHENTICATED: 'Authenticated',
        USERS_ADMINISTRATOR: 'Users Administrator',
    },
    principalExistsMessage: function (displayName) {
        return `Principal [${displayName}] could not be created. A principal with that name already exists`
    },

});