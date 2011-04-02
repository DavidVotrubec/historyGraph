dojo.provide('hg.CanvasController');

dojo.require('raphaeljs.raphaeljs-152');
dojo.require('hg.EventNodeController');
dojo.require('thirdparty.query');

dojo.declare('hg.CanvasController', null, {

    timelines: [],
    data: null,
    pageContentNode: null,
    canvas: null,
    yearWidthOnCanvas: 0,
    connectedEvents: [], //TODO
    config: {
        canvasPadding: 10
        , interval: 10 /*number of years to mark on axis*/
        , timelineCanvasHeight: 45
        , axisXHeight: 30
        , eventCircleRadius: 10
        , canvasHeight: null /*counted dynamically*/
        , canvasWidth: null /*counted dynamically*/
        , connectionLineHeight: 3
        , maxTitleLength: 13 /*number of letters to be displayed in title*/
    }, //config

    constructor: function (params) {
        console.warn('TODO: Graf se nezobrazuje spravne v IE8 -- nody udalosti nejosu videt...');

        this.pageContentNode = params.pageContentNode;
        this.data = params.data;
        this.timelines = params.data.timelines;
        if (this.timelines == undefined || this.timelines.length == 0) {
            console.warn(this.declaredClass + ' no data. No timelines given.');
        }

        dojo.mixin(this.config, params.config);

        var coords = dojo.coords(this.pageContentNode);
        this.config.canvasHeight = this.config.timelineCanvasHeight * this.timelines.length + this.config.axisXHeight + this.config.canvasPadding * 2;
        this.config.canvasWidth = coords.w;
        this.canvas = Raphael(this.pageContentNode, this.config.canvasWidth, this.config.canvasHeight);

        this.countDimensions();
        this.drawTimelines(this.timelines);
    }, //constructor

    drawTimelines: function (/*array*/timelines) {
        /*
        TODO: 
        resize canvas accordingly (if timelines.length changed) - todo
        */

        this.canvas.clear();
        this.config.canvasHeight = this.config.timelineCanvasHeight * timelines.length + this.config.axisXHeight + this.config.canvasPadding * 2;
        this.resize(this.config.canvasWidth, this.config.canvasHeight);

        for (var i = 0, l = timelines.length; i < l; i++) {
            var yPosition = (i + 1) * this.config.timelineCanvasHeight - this.config.timelineCanvasHeight / 2;
            this.drawTimeline(timelines[i], yPosition);
        }
        this.drawAxisX();

        this.drawConnections(timelines); //TODO: handle dnd
    }, //drawTimelines

    countDimensions: function () {
        var coords = dojo.coords(this.pageContentNode)
        , canvasAvailWidth = coords.w - (2 * this.config.canvasPadding)
        , years = this.data.endYear - this.data.startYear;

        this.yearWidthOnCanvas = Math.floor(canvasAvailWidth / years);
    }, //countDimensions

    resize: function (/*int*/x, /*int*/y) {
        this.canvas.setSize(x, y);
    }, //resize()

    drawAxisX: function () {
        //TODO: optional position of x axis via parameter
        var c = this.canvas
        , coords = dojo.coords(this.pageContentNode)
        //, posXAxis = coords.h - this.config.canvasPadding * 2
        , posXAxis = this.config.canvasHeight - this.config.canvasPadding * 2
        , yearsAxis = c.path('M' + this.config.canvasPadding + ' ' + posXAxis + ' L ' + (coords.w - this.config.canvasPadding) + ' ' + posXAxis);

        //draw interval marks:
        var constYTop = posXAxis
        , constYBottom = (this.config.canvasHeight - this.config.canvasPadding);
        for (var i = 0, n = (this.data.endYear - this.data.startYear) / this.config.interval; i <= n; i++) {
            var currYearMarked = i * this.config.interval
            , posX = currYearMarked * this.yearWidthOnCanvas + this.config.canvasPadding
            , markLine = c.path('M' + posX + ' ' + constYTop + ' L' + posX + ' ' + constYBottom)
            , markText = c.text(posX, constYBottom, currYearMarked + this.data.startYear);
        }
    }, //drawAxisX

    drawTimeline: function (timeline, yPosition) {
        var events = timeline.events;

        //draw timeline (connection line)
        //TODO: assume that events are sorted
        for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i]
            , nextEvent = events[i + 1];
            if (nextEvent == undefined) break;
            var x = this.getEventXPosition(event)
            , nextX = this.getEventXPosition(nextEvent)
            , line = this.canvas.path('M' + x + ' ' + (yPosition + 10) + 'L' + nextX + ' ' + (yPosition + 10));
            line.attr({ stroke: timeline.color, 'stroke-width': this.config.connectionLineHeight });
        }

        //draw actual event nodes
        for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i]
            , c = this.canvas.circle(this.getEventXPosition(event), yPosition + 10, this.config.eventCircleRadius)
            , title = this.canvas.text(this.getEventXPosition(event), yPosition - 10, event.name.substring(0, this.config.maxTitleLength));
            c.attr('fill', timeline.color);
            c.node.setAttribute('class', 'clickable');
            c.node.setAttribute('title', event.desc);

            var eventNodeController = new hg.EventNodeController({
                node: c.node
                , event: event
                , resources: { //TODO: resources
                    'lol': 'Froooom'
                }
            });
            eventNodeController.attachEventListeners();

            if (event.connectTo != undefined) {
                event.timeline = timeline; //used in future reference
                this.connectedEvents.push(event);
            }
        } //for
    }, //drawTimeline

    getEventXPosition: function (event) {
        //TODO: count also with endDate --> wide events (long duration ... eg. wars)

        //TODO: count with more precision than just years

        var date = new Date(parseInt(event.startDate))
        , year = date.getFullYear();
        return ((year - this.data.startYear) * this.yearWidthOnCanvas);
    }, //getEventXPosition

    getEventPosition: function (timeline, event) {
        var tmIndex = null, timelines = dojo.global.timelines;
        for (var i = 0, l = timelines.length; i < l; i++) {
            if (timelines[i].id == timeline.id) tmIndex = i;
        }
        if (tmIndex == null) {
            console.error(this.declaredName + ' tmIndex is null.');
        }
        var yPosition = (tmIndex + 1) * this.config.timelineCanvasHeight - this.config.timelineCanvasHeight / 2
        , xPosition = this.getEventXPosition(event);
        return { x: xPosition, y: yPosition };
    }, //getEventPosition()

    drawConnections: function (timelines) {
        //draw connection line between two connected events on different timelines
        var ev = this.connectedEvents;
        for (var i = 0, l = ev.length; i < l; i++) {
            var event = ev[i]
            , timelineId = event.connectTo.timelineId
            , date = event.connectTo.date;
            //proceed only if target timeline is visible
            if (dojo.some(timelines, function (tm) {
                return tm.id == timelineId;
            })) {
                //find position of targeted event
                var targetTimeline = hg.TimelineController.getTimelineById(timelines, timelineId)
               , targetEvent = hg.TimelineController.getEventByDate(targetTimeline, date, 'start');
                if (targetEvent == null) {
                    console.error(this.declaredName + ' targetEvent is null.');
                    return;
                }
                /* calculate positions */
                var targetPos = this.getEventPosition(targetTimeline, targetEvent)
                , startPos = this.getEventPosition(event.timeline, event)
                , halfCircle = this.config.eventCircleRadius / 2;

                //draw path
                var line = this.canvas.path('M' + (startPos.x) + ' ' + (startPos.y + 1 + halfCircle*3 + 4) + ' L' + targetPos.x + ' ' + (targetPos.y + 1 + this.config.eventCircleRadius / 2));
                line.attr({ stroke: targetTimeline.color, 'stroke-width': this.config.connectionLineHeight });
            };
        } //for
    } //drawConnections()

});