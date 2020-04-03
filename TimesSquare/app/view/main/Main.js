
var curTime = new Date();
var strCurTime = Ext.Date.format(curTime, 'jMy');

Ext.define('TimesSquare.view.main.Main', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'app-main',
    barMargin: 2,
    rowHeight: 35,
    title: 'Gantt (' + strCurTime + '-4Apr20)',
    bodyBorder: true,
    split: true,
    viewPreset: 'hourAndDay',
    startDate: curTime,
    eventResizeHandles: 'none',
    enableDragCreation: false,
    readOnly: true,
    plugins: [
        Ext.create('Sch.plugin.CurrentTimeLine', { updateInterval: 30000, showTip: false })
    ],
    //endDate    : new Date(2019, 11, 31),

    eventRenderer: function (item, r, tplData, row, col, ds, index) {
        return '' + item.get('Title') + ' <img src="https://tcg.netline.lhsystems.com/timessquare/resources/icons/Aircraft_state_logical.png">';
    },

    // Setup static columns
    columns: [
        { header: 'AC', cls: 'ops-bold', sortable: true, width: 90, dataIndex: 'AcReg' }
    ],

    header: {
        items: [
            //    {
            //        xtype: 'displayfield',
            //        value: '<img src="resources/images/osy-logo-small.png" style="max-width:460px;height:30px;padding-bottom:20px">',
            //    }
        ]
    },

    resourceStore: {
        type: 'resourcestore',
        sorters: {
            property: 'AcReg',
            direction: 'ASC'
        },
        data: [
            { Id: '138314723892', AcReg: 'DAD' },
            { Id: '138314723893', AcReg: 'FWX' },
        ]
    },

    eventStore: {
        type: 'eventstore',
        data: [
            {
                ResourceId: '138314723892',
                Title: "AGP-BKO (1776)",
                StartDate: new Date(2020, 3, 3, 18, 40),
                EndDate: new Date(2020, 3, 3, 21)
            },
            {
                ResourceId: '138314723893',
                Title: 'VCE-CTA (4324)',
                StartDate: new Date(2020, 3, 3, 19, 30),
                EndDate: new Date(2020, 3, 3, 23)
            }
        ]
    },

    onRender: function () {
        this.callParent();
    },

});