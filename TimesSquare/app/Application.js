var loggedIn = false;

Ext.define('TimesSquare.Application', {
    extend: 'Ext.app.Application',

    name: 'TimesSquare',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        Ext.onReady(function() {
            Ext.create({
                xtype: loggedIn ? 'app-main' : 'login'
            });
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
