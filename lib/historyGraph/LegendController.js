dojo.provide('hg.LegendController');

dojo.require('dijit._Templated');
dojo.require('dijit.Dialog');
dojo.require('thirdparty.StringBuffer');
dojo.require('thirdparty.query');

dojo.require("dijit.form.Button");
dojo.require("dijit.Menu");


//TODO: Prejmenovat na TimelineSelectBox

/*
TODO: 
Moznost dynamicky donacist dalsi casovou osu,
ktera neni na originalnim grafu zahrnuta
*/

dojo.declare('hg.LegendController', null, {
    timelines: null,
    pageContentNode: null,
    template: '<span class="item legend"><input type="checkbox" checked="checked" data-timelineId="{id}" id="chkbx_{id}"><div class="color" style="background-color: {color}";>&nbsp;</div><label for="chkbx_{id}" class="clickable">{name}</label></span>',
    canvasController: null,
    resources: {
        //legendTitle: 'Legenda'
        legendTitle: 'Správa časových os'
        , getMore: 'Načti další...'
    },
    constructor: function (params) {
        this.pageContentNode = params.pageContentNode;
        this.timelines = params.timelines;
        this.canvasController = params.canvasController;
        this.resources = dojo.mixin(this.resources, params.resources);

        var that = this;
        var menu = new dijit.Menu({
            style: 'display:none;'
        });
        that.menu = menu;

        for (var i = 0, l = this.timelines.length; i < l; i++) {
            var tml = this.timelines[i]
            , mi = new dijit.MenuItem({
                label: dojo.replace(this.template, { name: tml.name, color: tml.color, id: tml.id })
                , onClick: function (e) {
                    that.updateCheckbox(e.target);
                    that.updateGraph(that.menu.domNode);
                }
            });
            menu.addChild(mi);
        };
        var mi = new dijit.MenuItem({
            label: '<div style="width:100%;" class="getMore clickable">' + this.resources.getMore + '</div>'
            , onClick: function () { alert('Nacitani casovych os neni v demo verzi dostupne.'); }
        });
        menu.addChild(mi);

        var buttonTmlController = new dijit.form.DropDownButton({
            label: this.resources.legendTitle
            , name: 'huhuh'
            , dropDown: menu
            , id: 'pusa'
        });

        this.pageContentNode.appendChild(buttonTmlController.domNode);
        this.attachEventListenners();
    },

    updateCheckbox: function (target) {
        var chkbox = (target.tagName.toLowerCase() == 'input') ? dojo.query(target) : dojo.query('input[type=checkbox]', (target.tagName.toLowerCase() == 'tr') ? target : dojo.findParent(target, 'tr'))
        , checked = chkbox.attr('checked')[0];
        if (checked) chkbox[0].checked = false;
        else chkbox[0].checked = true;
    },

    updateGraph: function (context) {
        var that = this
        , checkedTimelines = []
            , checked = that.getChecked(context);
        for (var i = 0, l = checked.length; i < l; i++) {
            var id = checked[i].getAttribute('data-timelineId')
            tml = hg.TimelineController.getTimelineData(id);
            checkedTimelines.push(tml);
        }
        dojo.global.timelines = checkedTimelines;
        that.canvasController.drawTimelines(checkedTimelines);

        var node = dojo.query('.timelinesControllerContainer'); //TODO: context
        hg.TimelineController.buildTimelineControllers(checkedTimelines, node[0]); //TODO: queryForOne
    },

    attachEventListenners: function () {
        var that = this;

        //show/hide menu (list of timelines)
        dojo.query('.legendBox .title', this.pageContentNode).connect('click', (function () {
            var target = dojo.queryForOne('.collapsable', that.pageContentNode);
            if (dojo.hasClass(target, 'collapsed')) dojo.removeClass(target, 'collapsed');
            else dojo.addClass(target, 'collapsed');
        }));

        //attach onchange to checkboxes
        dojo.query('input', this.pageContentNode).connect('change', function () {
            var checkedTimelines = []
            , checked = that.getChecked();
            for (var i = 0, l = checked.length; i < l; i++) {
                var id = checked[i].getAttribute('data-timelineId')
                tml = hg.TimelineController.getTimelineData(id);
                checkedTimelines.push(tml);
            }
            dojo.global.timelines = checkedTimelines;
            that.canvasController.drawTimelines(checkedTimelines);

            var node = dojo.query('.timelinesControllerContainer'); //TODO: context
            hg.TimelineController.buildTimelineControllers(checkedTimelines, node[0]); //TODO: queryForOne
        });
    },

    getChecked: function (context) {
        var inputs = dojo.query('input', context)
        , checkedInputs = [];
        inputs.forEach(function (input) {
            if (input.checked == true) {
                checkedInputs.push(input)
            }
        });
        return checkedInputs;
    }

});