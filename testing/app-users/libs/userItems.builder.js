/**
 * Created on 6/30/2017.
 */
module.exports = {
    generateRandomName: function (part) {
        return part + Math.round(Math.random() * 1000000);
    },
    generateEmail: function (userName) {
        return userName + '@gmail.com'
    },
    buildUserStore: function (displayName, description, providerName, permissions) {
        return {
            displayName: displayName,
            description: description,
            providerName: providerName,
            permissions: permissions,
        };
    },
    buildUser: function (displayName, password, email, roles) {
        return {
            displayName: displayName,
            password: password,
            email: email,
            roles: roles,
        };
    },
    buildRole: function (displayName, description, members) {
        return {
            displayName: displayName,
            description: description,
            members: members,
        };
    },
    buildGroup: function (displayName, description, members, roles) {
        return {
            displayName: displayName,
            description: description,
            members: members,
            roles: roles,
        }
            ;
    },
};
