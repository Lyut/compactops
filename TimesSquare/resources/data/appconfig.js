var TimesSquare = TimesSquare || {};
TimesSquare.CONFIG = {
    "application": {
        "name": "CompactOps++ TimesSquare",
        "urls": {
            "EndpointUrlPrefix": "http://localhost:3000/api"
        },
    },

    appLogo: 'resources/images/osy-logo-transparent.png',

    "detailViewFieldSize": {
        smallField: 40,
        mediumField: 80,
        largeField: 120,
        margin: '0 6 6 0',
        labelStyle: {
            padding: '21px 0 0 0',
            verticalAlign: 'middle'
        },
        set: function (small, margin) {
            this.margin = margin.join(' ');
            this.smallField = small;
            this.mediumField = (2 * small);
            this.largeField = this.mediumField + this.smallField + margin[1] + margin[3];
        }
    }
}