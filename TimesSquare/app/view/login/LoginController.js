var loggedIn = false;

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: ['username', 'password'],

    proxy: {
        type: 'rest',
        url: TimesSquare.CONFIG.application.urls.EndpointUrlPrefix + '/Users/login'
    }
});


Ext.define('TimesSquare.utils.Login', {
    singleton: true,

    messageMap: {
        "iocc.sec.unexpected.exception": "An unexpected server error has occurred while processing your request! Please try again later or contact the system administrator!",
        "iocc.sec.authentication.failed": "Authentication failed: username or password invalid!",
        "iocc.sec.connection.error": "Connection to security service could not be created!"
    },

    showException: function(message, title, icon) {
        if (!title)
            title = "Error in Service!";
        if (!icon)
            icon = Ext.MessageBox.ERROR;
        if (TimesSquare.utils.Login.messageMap == null)
            Ext.log.warn("Could not find messageMap property - only default error keys will be translated! See TimesSquare.utils.Login.messageMap for default values.")    
        else {
            Ext.MessageBox.show({
                title: title,
                msg: TimesSquare.utils.Login.messageMap[message],
                buttons: Ext.MessageBox.OK,
                icon: icon
            });
        }
    }
});


Ext.define('TimesSquare.utils.Gantt',{
    singleton: true,
    
    drawGantt: function() {
        Ext.create('Ext.container.Viewport', {
            items: [{
                xtype: 'toolbar',
                region: "north",
                split: false,
                toolbar: true,
                component: true,
                box: true,
                maintoolbar: true,
                border: false,
                height: 32,
                items: [{
                    xtype: "image",
                    alt: "osy-logo",
                    inspect: "app-logo",
                    src: TimesSquare.CONFIG.appLogo,
                    autoRender: true,
                    height: 24
                }, "->", {
                    iconCls: "icon-searchleg",
                    action: "searchleg",
                    clickEvent: "mousedown",
                    tooltip: "Search Leg"
                }, {
                    xtype: "tbspacer",
                    width: 7
                }, "-", {
                    xtype: "tbspacer",
                    width: 7
                }, {
                    text: "Logout",
                    action: "logout",
                    iconCls: "icon-key",
                    handler: function () {
                        Ext.Ajax.request({
                            url: TimesSquare.CONFIG.application.urls.EndpointUrlPrefix + '/Users/logout?access_token=' + localStorage.getItem("access_token"),
                            method: 'POST',
                            success: function (transport) {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('userId');
                                window.location.reload();
                            },
                            failure: function (transport) {
                                alert("Error: " + transport.responseText);
                            }
                        });
                    }
                }, {
                    xtype: "tbspacer",
                    width: 7
                }]
            },
            {
                xtype: 'app-main',
                region: 'center',
                height: window.innerHeight - 50//TODO: FIX, find a more elegant way
                //   layout: 'fit',
            }]
        });
    },
});

Ext.define('TimesSquare.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    init: function() {
        loginView = this.getView();
        var accessToken = localStorage.getItem("access_token");
        var userId = localStorage.getItem("userId");
        var dateUtc = new Date().getTime();
        if (accessToken && userId != null) {
            Ext.Ajax.request({
                url: TimesSquare.CONFIG.application.urls.EndpointUrlPrefix + '/Users/' + userId + '/accessTokens/' + accessToken,
                method: 'GET',
                success: function (transport) {
                    if (dateUtc - Date.parse(JSON.parse(transport.responseText).created) < JSON.parse(transport.responseText).ttl) {
                        loggedIn = true; // TODO: fix login view creating before the loggedin condition is determined
                        loginView.destroy();
                        TimesSquare.utils.Gantt.drawGantt();
                    }
                    else {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("userId");
                        Ext.Msg.show({
                            title: "Session timeout",
                            msg: "The user has been logged out due to session timeout.",
                            buttons: Ext.Msg.OK,
                            closable: false,
                            icon: Ext.Msg.WARNING,
                            fn: function () {
                                window.location.reload()
                            }
                        });
                    }
                },
                failure: function (transport) {
                    //alert("Error: " + transport.responseText);
                    TimesSquare.utils.Login.showException("iocc.sec.unexpected.exception");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("userId");
                }
            });
        }
    },

    onLoginClick: function (button) {
        loginView = this.getView();
        loginView.setLoading('Login...');

        var user = Ext.create('User', { username: button.up('form').getValues().user, password: button.up('form').getValues().password });

        user.save({
            failure: function (user, request) {
                if (request.error.status == 401) {
                    TimesSquare.utils.Login.showException("iocc.sec.unexpected.exception", "Error in Operation!");
                    loginView.setLoading(false);
                }
                else {
                    TimesSquare.utils.Login.showException("iocc.sec.unexpected.exception");
                    loginView.setLoading(false);
                }
            },

            success: function (user) {
                localStorage.setItem("access_token", user.data.id);
                localStorage.setItem("userId", user.data.userId);
                loginView.setLoading(false);
                loginView.destroy();

                // Add the main view to the viewport
                TimesSquare.utils.Gantt.drawGantt();
            }
        });
    },
    // TODO: make better password change
    onPasswordChangeClick: function () {
        this.getView().destroy();
        Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            constrain: true,
            width: 500,
            y: 100,
            title: "Change Password",
            iconCls: "icon-key",
            items: {
                xtype: "form",
                border: 0,
                height: 350,
                width: 488,
                bodyStyle: "border:0 none",
                bodyPadding: 15,
                items: [{

                    xtype: 'displayfield',
                    width: 300,
                    padding: "15 15 0 15",
                    value: '<div style="font-size:14px;color:#194C7F;font-weight:bold">Change password</div><img src="' + TimesSquare.CONFIG.appLogo + '" style="width:250px;height:30px;margin-top:10px" />'

                },
                {
                    xtype: "textfield",
                    labelAlign: "top",
                    fieldLabel: "User Name",
                    name: "user",
                    itemId: "user",
                    margin: "0 0 5 20",
                    labelStyle: "margin-bottom:5px",
                    anchor: "100%",
                    fieldStyle: 'text-transform:uppercase',
                    allowBlank: false,

                }, {
                    xtype: "textfield",
                    labelAlign: "top",
                    fieldLabel: "New Password",
                    inputType: "password",
                    name: "password1",
                    margin: "0 0 5 20",
                    allowBlank: false,
                    labelStyle: "margin-bottom:5px",
                    anchor: "100%",

                }, {
                    xtype: "textfield",
                    labelAlign: "top",
                    fieldLabel: "New Password Again",
                    inputType: "password",
                    name: "password2",
                    margin: "0 0 5 20",
                    labelStyle: "margin-bottom:5px",
                    anchor: "100%",
                    validator: function (b) {
                        return b === this.prev().getValue() ? true : "Passwords do not match!"
                    },

                }, {
                    xtype: "textfield",
                    labelAlign: "top",
                    fieldLabel: "\xa0",
                    labelSeparator: "",
                    margin: "0 0 5 20",
                    labelStyle: "margin-bottom:5px",
                    anchor: "100%",
                    readOnly: true,
                    itemId: "pwStrength",
                    value: "Password Strength"
                }]
            }
        }).show();
    }
});
