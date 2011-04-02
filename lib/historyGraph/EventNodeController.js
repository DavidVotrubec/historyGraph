dojo.provide('hg.EventNodeController');

dojo.require('dijit.Dialog');
dojo.require('dojo.cache');
dojo.require('thirdparty.dateformat');
dojo.require('thirdparty.query');
dojo.require('thirdparty.StringBuffer'); //TODO: odstranit .. jen pro to aby byl clanek delsi..

dojo.declare('hg.EventNodeController', null, {

    event: null,
    node: null,
    articleContainer: null,
    config: {
        dateFormat: 'dd.mm.yyyy'
    },
    resources: {
        'from': 'Od'
        , 'to': 'Do'
        , 'description': 'Popis'
    },

    constructor: function (params) {
        dojo.extend(this.config, params.config);

        //TODO:
        //console.log(params.resources);
        //console.log(this.resources);
        //dojo.extend(this.resources, params.resources); //TODO: NEFUNGUJE !!!!!!

        this.node = params.node;
        this.event = params.event;
    },

    attachEventListeners: function () {
        var that = this;
        dojo.connect(this.node, 'click', function () {
            //that.showDetailDialog();
            that.showArticle();
        });
    },

    showArticle: function () {
        /*
        TODO:
        - nacti odnekud data
        - zobraz je
        - zjisti jestli jsou nejake mapy atd..
        */
        /*
        this.articleContainer = dojo.queryForOne('.articleContainer');
        this.articleContainer.innerHTML = this.event.desc;
        */
        var artContainer = dojo.queryForOne('.articleContainer')
        , txt = this.event.desc
        , sb = new StringBuffer(txt);

        for (var i = 0; i < 18; i++) {
            sb.append(i + ' ' + txt);
        }
        artContainer.innerHTML = sb.toString();
    },

    showDetailDialog: function () {
        //TODO: unused .. deprecated...
        //TODO: refactor... use part of this code for edit dialog (maybe)
        this.event.startDateFormatted = new Date(parseInt(this.event.startDate, 10)).format(this.config.dateFormat);
        this.event.endDateFormatted = new Date(parseInt(this.event.endDate, 10)).format(this.config.dateFormat);
        var template = dojo.cache('hg', 'templates/EventDetailDialog.htm');
        var templated = dojo.replace(template, { event: this.event, resources: this.resources });

        var params = {
            title: this.event.name
            , content: templated
            , style: 'min-width: 300px; max-width: 500px; min-height: 50px;'
        }
        , dialog = new dijit.Dialog(params);
        dialog.show();
    }

});