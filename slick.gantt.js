(function ($) {
    $.extend(true, window, {
	"Ext": {
	    "GanttColumn": GanttColumn
	}
    });

    function GanttColumn(options) {

	var _grid;
	var _self = this;
	var _handler = new Slick.EventHandler();
	var _dailyScale = 50;
	var _defaults = {
	    columnId: "_gantt",
	    cssClass: 'gantt-cell',
	    toolTip: 'Gantt',
	    width: 300
	};

	var _options = $.extend(true, {}, _defaults, options);

	function init(grid) {
	    _grid = grid;
	    _handler
	        .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
		.subscribe(_grid.onClick, handleClick)
	        .subscribe(_grid.onHeaderClick, handleHeaderClick);
	}

	function destroy() {
	    _handler.unsubscribeAll();
	}

	function getColumnSpacers(header) {
	    var ganttColumnCount = Math.floor(_options.width / _dailyScale)-1;
	    var headerDiv = $('<div/>');
	    for (var i=0; i<ganttColumnCount; i++) {
		var colDiv = $('<div/>');
		colDiv.width(_dailyScale);
		if (header) {
		    colDiv.addClass('gantt-header-column');
		    colDiv.html('a');
		} else {
		    colDiv.addClass('gantt-cell-column');
		}
		colDiv.html('&nbsp;');
		colDiv.appendTo(headerDiv);
	    }
	    return headerDiv.html();
		
	}

	function getCellFormatter(row, cell, value, columnDef, dataContext) {
	    return getColumnSpacers(false);
	}

	function getColumnDefinition() {
	    return {
		id: _options.columnId,
		name: getColumnSpacers(true),
		toolTip: _options.toolTip,
		field: "sel",
		width: _options.width,
		resizable: false,
		sortable: false,
		cssClass: _options.cssClass,
		formatter: getCellFormatter
	    }
	}


	$.extend(this, {
	    "init": init,
	    "destroy": destroy,

	    "getColumnDefinition": getColumnDefinition
	});
    }
})(jQuery);