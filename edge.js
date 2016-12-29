/*imports*/
var node = require("./node");
/*exports*/
module.exports.Edge = Edge;

function Edge(nodeFrom, nodeTo) {
	var from = nodeFrom;
	var to = nodeTo;
	var id = [nodeFrom.getID(), nodeTo.getID()];

	this.getDetails = function () {
		console.log("The edge ID is " + id);
	};

	this.getFrom = function() {
		return from;
	}

	this.getTo = function() {
		return to;
	}


	this.matchesEdge = function(otherEdge) {
		var otherFrom = otherEdge.getFrom();
		var otherTo = otherEdge.getTo();
		if (from.matchesNode(otherFrom)) {
			if (to.matchesNode(otherTo)) {
				console.log(true);
				return true;
			};

		};
		console.log(false);
		return false;

	};
};

//demo:
var n1 = new node.Node('n1');
var n2 = new node.Node('n2');
var n3 = new node.Node('n3');
var n4 = new node.Node('n4');
var q = new Edge(n1, n2);
var w = new Edge(n1, n2);
var e = new Edge(n1, n3);
var r = new Edge(n3, n2);
var t = new Edge(n3, n4);

q.matchesEdge(w)  //true
q.matchesEdge(e)  //false
q.matchesEdge(r)  //false
q.matchesEdge(t)  //false