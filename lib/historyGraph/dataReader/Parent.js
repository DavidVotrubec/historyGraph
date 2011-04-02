dojo.provide('hg.dataReader.Parent');

dojo.declare('hg.dataReader.Parent', null, {
	defaults: {
		startYear: 1800
        , endYear: 1950
        , step: 10
	},
	constuctor: function(params) {
		//does nothing
		alert('parent constr called');
	}	
});

