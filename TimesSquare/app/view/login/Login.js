Ext.define('TimesSquare.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'TimesSquare.view.login.LoginController',
        'Ext.form.Panel'
    ],

    constrain: true,
    controller: 'login',
    id: 'loginPanel',
    cls: 'loginPanel',
    title: 'CompactOperations++',
    iconCls: 'icon-ops',
    closable: false,
    autoShow: true,
    border: false,
    modal: true,
    shadow: false,
    constrain: true,
    resizable: false,
    items: {
        height: 250,
        width: 488,
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'displayfield',
            padding: "15 15 0 15",
            value: '<div style="font-size:14px;color:#194C7F;font-weight:bold;margin-bottom:10px;">Login</div><img src="resources/images/osy-logo-small.png" style="max-width:460px;height:30px;">'
        }, {
            xtype: 'textfield',
            labelAlign: "top",
            fieldLabel: "Login Name",
            name: "user",
            itemId: "user",
            margin: "0 0 5 280",
            labelStyle: "margin-bottom:5px;",
            anchor: "98%",
            fieldStyle: 'text-transform:uppercase',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            labelAlign: "top",
            fieldLabel: "Password",
            inputType: "password",
            name: "password",
            itemId: "password",
            margin: "0 0 30 280",
            labelStyle: "margin-bottom:5px",
            anchor: "98%",
            allowBlank: false
        }],
        buttons: [{
            text: 'Change Password',
            formBind: false,
            listeners: {
                click: 'onPasswordChangeClick'
            }
        }, {
            text: 'Login',
            iconCls: 'icon-key',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});