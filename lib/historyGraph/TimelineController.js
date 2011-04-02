dojo.provide('hg.TimelineController');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dijit.Dialog');
dojo.require('dojo.cache');
dojo.require('dijit.form.SimpleTextarea');

dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

//dojo.declare('hg.TimelineController', [dijit._Widget, dijit._Templated], {
dojo.declare('hg.TimelineController', null, {
    xx_buildRendering: function () {
        // we already have the srcNodeRef, so lets just
        // keep it and use it as the domNode
        this.domNode = this.srcNodeRef;
        // call this._attachTemplateNodes to parse the template,
        // which is actually just the srcnode
        // this method is provided by the _Templated mixin
        this._attachTemplateNodes(this.domNode);
    },

    xx_constructor: function (params) {
        //it seems i can create object without constructor... what will be used then instead of it
        alert('hu ha ');
    },

    dialog: null,
    mockDataObject: {
        name: ''
        , desc: ''
        , color: ''
    },
    resources: {
        /* TODO: nacitat resources pres constructor (jde to??) */
        'name': 'Název'
            , 'description': 'Popis'
            , 'save': 'Uložit'
            , 'reset': 'Reset'
            , 'color': 'Barva'
            , dialogTitle: 'Editace časové osy'
    },

    showEditDialog: function (/*obj*/params) {
        var timelineId = params.timelineId
        , template = dojo.cache('hg', 'templates/TimelineEditDialog.htm')
        , data = (!timelineId) ? this.mockDataObject : hg.TimelineController.getTimelineData(timelineId)
        , templateTranslated = dojo.replace(template, { resources: this.resources, data: data });
        var container = dojo.create('div', { 'class': 'TEDContainer', innerHTML: templateTranslated }, dojo.body());
        dojo.parser.parse(container);
        this.attachEvents(container);

        dijit.byId("timelineEditDialog").show();

        //TODO: dojo.connect callback onSave - zavola se pri stisku tlacitka v edit formulare

    },


    attachEvents: function (dialog) {
        var that = this
        , context = dialog.domNode
        , btnSave = dojo.queryForOne('.btnSave', context)
        , btnReset = dojo.queryForOne('.btnReset', context);
        dojo.connect(btnSave, 'click', function () {
            that.onSaveClick();
        });
        dojo.connect(btnReset, 'click', function () {
            that.onResetClick();
        });
    },

    onSaveClick: function () {
        console.log('onSaveClick');
        this.dialog.destroyRecursive();
    },
    onResetClick: function () {
        console.log('onResetClick');
        //this.dialog.destroyRecursive();
    }

});

///////////////////////////////////////////////////////////////////////////////////
//static methods
///////////////////////////////////////////////////////////////////////////////////
hg.TimelineController.getEventByDate = function (timeline, date, /*optional 'start|end'*/dateType) {
    var events = timeline.events
    , dt = (dateType == undefined) ? 'start' : dateType.toLowerCase();
    /*
    for (var i = 0, l = events.length; i < l; i++) {
    if (events[i].id == id) return events[i];
    }
    */
    if (dt == 'start') {
        for (var i = 0, l = events.length; i < l; i++) {
            if (events[i].startDate == date) return events[i];
        }
    }
    else if (dt == 'end') {
        for (var i = 0, l = events.length; i < l; i++) {
            if (events[i].endDate == date) return events[i];
        }
    }
    else {
        console.error('hg.TimelineController.getEventByDate wrong dateType: ' + dateType);
    }
    return null;
} //getEventByDate()

hg.TimelineController.getTimelineById = function (timelines, id) {
    for (var i = 0, l = timelines.length; i < l; i++) {
        if (timelines[i].id == id) return timelines[i];
    }
    return null;
}    //getTimelineById()

hg.TimelineController.getTimelineData = function (id) {
    var timelines = dojo.global.timelinesCache;
    for (var i = 0, l = timelines.length; i < l; i++) {
        var tl = timelines[i];
        if (tl.id == id) return tl;
    }
} //getTimelineData()

hg.TimelineController.getIds = function (node) {
    //returns timeline ids[]
    var ids = [];
    dojo.query('.timelineController', node.node).forEach(function (n) {
        var id = n.getAttribute('timelineId');
        if (id != null) ids.push(id);
        else {
            console.error(this.declaredName + '.getIds : no timelineId attribute on node.');
        }
    });
    return ids;
} //getIds()

hg.TimelineController.createNewTimelineArray = function (/*ids []*/ids) {
    var timelines = [];
    for (var i = 0, l = ids.length; i < l; i++) {
        var timeline = hg.TimelineController.getTimelineData(ids[i]);
        timelines.push(timeline);
    }
    return timelines;
} //newTimelineArray

hg.TimelineController.resources = {    
    edit: 'Edit'
    , dnd: 'DnD'
} //resources

hg.TimelineController.dnd = function () {
    alert('dnd zlo');
}

//use singleton instance
hg.TimelineController.instance = new hg.TimelineController();

hg.TimelineController.buildTimelineControllers = function (/*array*/timelines, /*node*/pageContentNode) {
    // build timeline controllers (for dnd, edit)

    pageContentNode.innerHTML = '';
    if (timelines.length == 0) {
        console.log(this.declaredClass + ' no timelines found.');
    }
    else {
        for (var i = 0, l = timelines.length; i < l; i++) {
            var node = dojo.create('div', { 'class': 'dojoDndItem' }, pageContentNode)
            , template = dojo.cache('hg', 'templates/TimelineController.htm')
            , templateTranslated = dojo.replace(template, { resources: hg.TimelineController.resources, data: timelines[i] });
            node.innerHTML = templateTranslated;

            dojo.connect(dojo.queryForOne('.edit', node), 'click', function (e) {
                var target = dojo.findParent(e.target, '.timelineController')
                hg.TimelineController.instance.showEditDialog({ timelineId: target.getAttribute('timelineId') });
            });
        }
    }
    //dojo.parser.parse(pageContentNode.parentNode); //not needed, but i lost dnd
}     //buildTimelineControllers()