dojo.provide('hg.App');

dojo.require('dojo.cache');
dojo.require('hg.TimelineController');
dojo.require('hg.CanvasController');
dojo.require('hg.LegendController');

dojo.require('dijit.ColorPalette');
dojo.require("dijit.form.Button");
dojo.require("dijit.Menu");

dojo.require('dojo.dnd.Source');

dojo.declare('hg.App', null, {
    pageContentNode: null,
    containerNode: null,
    graphContainer: null,
    timelinesControllerNode: null,
    canvasContainer: null,
    canvasController: null,
    appName: '',
    url: '',
    templatePath: './templates',

    config: {
        timelinesControllerNodeWidth: '110'
    },

    /*
    resources: {
    //TODO: nemel bych mit resources rozhazeny vsude... -> udelat 1 soubor .cs ze kt. se to bude nacitat pri buildovani
    edit: 'Edit'
    , dnd: 'DnD'
    },
    */

    constructor: function (params) {
        this.pageContentNode = params.pageContentNode;
        this.appName = params.appName;
        this.url = params.url;

        this.buildApp();
    }, //constructor()

    buildApp: function () {
        this.pageContentNode.innerHTML = '';
        this.containerNode = dojo.create('div', { 'class': 'hgAppContainer' }, this.pageContentNode);

        var that = this
        , data = this.getData()
        , timelines = data.timelines;
        dojo.global.timelines = timelines; //store data globaly for later usage
        dojo.global.timelinesCache = timelines;

        var actionBox = dojo.create('div', { 'class': 'actionBox' }, this.containerNode);

        this.graphContainer = dojo.create('div', { 'class': 'graphContainer' }, this.containerNode);
        this.timelinesControllerNode = dojo.create('div', { 'class': 'timelinesControllerContainer', dojoType: 'dojo.dnd.Source', 'style': 'width: ' + this.config.timelinesControllerNodeWidth + 'px;' }, this.graphContainer);
        hg.TimelineController.buildTimelineControllers(timelines, this.timelinesControllerNode);

        var canvasWidth = dojo.coords(this.pageContentNode).w - this.config.timelinesControllerNodeWidth - 2;
        this.canvasContainer = dojo.create('div', { 'class': 'canvasContainer', 'style': 'width: ' + canvasWidth + 'px;' }, this.graphContainer);
        this.canvasController = new hg.CanvasController({ data: data, pageContentNode: this.canvasContainer });

        this.createActionBox(actionBox);

        //TODO: move to TimelineController as static method called from here..
        dojo.subscribe("/dnd/drop", function () {
            var ids = hg.TimelineController.getIds(dojo.dnd.manager().target)
            , newTimelines = hg.TimelineController.createNewTimelineArray(ids);
            that.canvasController.drawTimelines(newTimelines);
        });

        //create placeholder for article
        var articleContainer = dojo.create('div', { 'class': 'articleContainer' }, this.containerNode);
    }, //buildApp()

    createActionBox: function (node) {
        //container for legend, and buttons

        var tc = hg.TimelineController.instance;

        //create legend box
        var legendController = new hg.LegendController({
            pageContentNode: node
            , timelines: timelines
            , canvasController: this.canvasController
        });

        //create buttons
        var btnAddTimeline = new dijit.form.Button({
            label: 'Založit novou časovou osu' //TODO: Resources
            , onClick: function () {
                tc.showEditDialog({
                    timelineId: null
                });
            }
        })
        , btnAddEvent = new dijit.form.Button({
            label: 'Založit novou událost' //TODO: Resources
            , onClick: function () { alert('TODO add event') }
        });
        node.appendChild(btnAddTimeline.domNode);
        node.appendChild(btnAddEvent.domNode);
    },

    //no use for async here... i can not do anything without timeline data anyway...
    getData: function () {
        var url = this.url + '/data.js'
        , _data = {};

        dojo.xhrGet({
            url: url,
            handleAs: 'json',
            sync: true,
            load: function (data) {
                _data = data;
                console.log(data);
            }
        });

        return _data;
    }
});