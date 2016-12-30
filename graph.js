//NOTE: this is a DIRECTED graph

/*imports*/
var node = require("./node");
var edge = require("./edge");

function Graph() {

	var edges = [];
	var nodes = [];

	this.addEdge = function(newEdge) {
		//check if node already exists
		for (var edge in edges) {
			if (edge == newEdge) {
				return;
			};
		};
		//else, add it
		edges.push(newEdge);
	};

	this.addNode = function(newNode) {
		//check if node already exists
		for (var node in nodes) {
			if (node.getID() == newNode.getID()) {
				console.log("The node id " + node.getID() + " is already taken.");
				return;
			};
		};
		//else, add it
		nodes.push(newNode);
	};

	this.deleteEdge = function(badEdge) {
        for (i = 0; i = edges.length; i++) {
        	if (edges[i].matchesEdge(badEdge)) {
                edges.splice(i, 1);
                return;
        	};
        };
        console.log("Specified edge not found...")
	};


	this.deleteNode = function(badNode) {
        for (i = 0; i = nodes.length; i++) {
        	if (nodes[i].matchesNode(badNode)) {
                nodes.splice(i, 1);
                return;
        	};
        };
        console.log("Specified node not found...")
	};

	this.getNeighbours = function() {
		//to-do
	};

	this.getDetails = function () {
		console.log("The graph contains the following nodes... " + nodes);
		console.log("and the following edges... " + edges);
	};
};