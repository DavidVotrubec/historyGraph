/*
 * TODO:
 * Reads data from html table
 * and creates datasource in format expected by hg
 * - sample format is in data.js
 * 
 * Get all <table>s in given html element
 * then for each table call read() method -> to extract data into new timeline (dataholder)
 * then combine all timelines to array and return it.
 * 
 * TODO:
 * can i use interface in dojo?
 * can i have DataReaderYQL for YQL tables? 
 * or for any other data source?
 */
dojo.provide('hg.dataReader.TableReader');

dojo.require('hg.dataReader.Parent');
dojo.require('dojox.xml.parser');

dojo.declare('hg.dataReader.TableReader', [hg.dataReader.Parent], {
	constructor: function(params) {
		//alert('new data reader ' + this.defaults.step);	
	},
	//TODO: should return same data structure as in data.js
	read: function(table) {
		var timeline = {}
		, caption = dojo.queryForOne('caption', table) 
		, tlName = (caption) ? dojox.xml.parser.textContent(caption) : this.defaults.timelineName
		, rows = dojo.query('tbody tr', table)
		, events = [];
		
		if (rows.length == 0) {
			console.error('hg.TableRender - no rows in table');
			return;
		}
		
		//read data in table
		//TODO: I assume that data (cells) are in this order:
		//Date, Title, Description
		dojo.forEach(rows, function(row){
			var cells = dojo.query('td', row)
			, event = {};
			//TODO: Date parser !!
			event.startDate = event.endDate = dojox.xml.parser.textContent(cells[0]);
			event.name = dojox.xml.parser.textContent(cells[1]);
			event.desc = dojox.xml.parser.textContent(cells[2]);
			events.push(event);
		});
		
		timeline.id = 'someRandomID'; //TODO
		timeline.name = tlName;
		timeline.desc = this.defaults.description;
		timeline.color = this.defaults.color;
		timeline.events = events;		
		
		return timeline;
	}
});
