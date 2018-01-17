var t = require('/lib/xp/testing');
var auth = require('/lib/auth');

function createAndAssert(params) {

    var result = auth.createUserStore(params);

    var expectedJson = {
        key: 'myUserStore',
        displayName: 'User store test',
        description: 'User store used for testing',
        authConfig: {
            applicationKey: 'com.enonic.app.test',
            config: [
                {
                    name: 'title',
                    type: 'String',
                    values: [
                        {
                            v: 'App Title'
                        }
                    ]
                },
                {
                    name: 'avatar',
                    type: 'Boolean',
                    values: [
                        {
                            v: true
                        }
                    ]
                },
                {
                    name: 'forgotPassword',
                    type: 'PropertySet',
                    values: [
                        {
                            set: [
                                {
                                    name: 'email',
                                    type: 'String',
                                    values: [
                                        {
                                            v: 'noreply@example.com'
                                        }
                                    ]
                                },
                                {
                                    name: 'site',
                                    type: 'String',
                                    values: [
                                        {
                                            v: 'MyWebsite'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    };

    t.assertJsonEquals(expectedJson, result);
}

exports.createUserStore = function () {
    createAndAssert({
        name: 'myUserStore',
        displayName: 'User store test',
        description: 'User store used for testing',
        authConfig: {
            applicationKey: 'com.enonic.app.test',
            config: [
                {
                    name: 'title',
                    type: 'String',
                    values: [
                        {
                            v: 'App Title'
                        }
                    ]
                },
                {
                    name: 'avatar',
                    type: 'Boolean',
                    values: [
                        {
                            v: true
                        }
                    ]
                },
                {
                    name: 'forgotPassword',
                    type: 'PropertySet',
                    values: [
                        {
                            set: [
                                {
                                    name: 'email',
                                    type: 'String',
                                    values: [
                                        {
                                            v: 'noreply@example.com'
                                        }
                                    ]
                                },
                                {
                                    name: 'site',
                                    type: 'String',
                                    values: [
                                        {
                                            v: 'MyWebsite'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        permissions: [
            {
                principal: 'user:myUserStore:user',
                access: 'ADMINISTRATOR'
            },
            {
                principal: 'group:myUserStore:group',
                access: 'CREATE_USERS'
            }
        ]
    });
};

exports.createUserStoreByName = function () {
    createAndAssert({name: 'myUserStore'});
};
