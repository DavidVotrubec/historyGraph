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

dojo.declare('hg.dataReader.TableReader', [hg.dataReader.Parent], {
	constructor: function(params) {
		//alert('new data reader ' + this.defaults.step);	
	},
	read: function(table) {
		alert(table.innerHTML);
	}
});
