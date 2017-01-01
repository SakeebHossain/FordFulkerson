//Node object-------------------------------------------------------------------------------------

function Node(id) {
    this.id = id;

    this.getID = function() {
    	return id;
    };

    this.matchesNode = function(otherNode) {
    	if (id == otherNode.getID()) {
    		return true;
    	}
    	return false;

    };
};

//Edge object-------------------------------------------------------------------------------------

function Edge(nodeFrom, nodeTo) {
    this.from = nodeFrom;
    this.to = nodeTo;
    this.id = [nodeFrom.getID(), nodeTo.getID()];

    this.getDetails = function () {
        console.log("The edge ID is " + this.id);
        return;
    };

    this.getFrom = function() {
        return this.from;
    }

    this.getTo = function() {
        return this.to;
    }


    this.matchesEdge = function(otherEdge) {
        var otherFrom = otherEdge.getFrom();
        var otherTo = otherEdge.getTo();
        if (this.from.matchesNode(otherFrom)) {
            if (this.to.matchesNode(otherTo)) {
                console.log(true);
                return true;
            };

        };
        console.log(false);
        return false;

    };
};

//DirectedGraph object----------------------------------------------------------------------------

function DirectedGraph() {

    this.edges = [];
    this.nodes = [];

    this.addEdge = function(newEdge) {
        //check if node already exists
        for (var edge in this.edges) {
            if (edge == newEdge) {
                return;
            };
        };
        //else, add it
        edges.push(newEdge);
    };

    this.addNode = function(newNode) {
        //check if node already exists
        for (var node in this.nodes) {
            if (node.getID() == newNode.getID()) {
                console.log("The node id " + node.getID() + " is already taken.");
                return;
            };
        };
        //else, add it
        this.nodes.push(newNode);
    };

    this.deleteEdge = function(badEdge) {
        for (i = 0; i = this.edges.length; i++) {
            if (this.edges[i].matchesEdge(badEdge)) {
                this.edges.splice(i, 1);
                return;
            };
        };
        console.log("Specified edge not found...")
    };


    this.deleteNode = function(badNode) {
        for (i = 0; i = this.nodes.length; i++) {
            if (this.nodes[i].matchesNode(badNode)) {
                this.nodes.splice(i, 1);
                return;
            };
        };
        console.log("Specified node not found...")
    };

    this.getNeighbours = function() {
        //to-do
    };

    this.getDetails = function () {
        
        // var n = [];
        // var e = [];
        // for (i = 0; i = this.nodes.length; i++) {
        //     if (this.nodes[i] == undefined) {
        //         console.log('fail node');
        //     } else {
        //     n.push(this.nodes[i].getID());
        //     }
        // };  
        // for (i = 0; i = this.dges.length; i++) {
        //     if (this.edges[i] == undefined) {
        //         console.log('fail edge');
        //     } else {
        //         n.push(this.nodes[i].getID());
        //     };
        // };
        // console.log("The graph contains the following nodes... " + n);
        // console.log("and the following edges... " + e);

        for (i = 0; i = this.nodes.length; i++) {
            console.log(this.nodes[i]);
        };
    


    };
};

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
// //testing if Node and Edge work together, and their methods
var n1 = new Node('n1');
var n2 = new Node('n2');
var n3 = new Node('n3');
var n4 = new Node('n4');
var n1 = new Node('n1');
var q = new Edge(n1, n2);
var w = new Edge(n1, n2);
var e = new Edge(n1, n3);
var r = new Edge(n3, n2);
var t = new Edge(n3, n4);

// console.log(n1.getID(), n1.id);
// console.log(q.getDetails());

// q.matchesEdge(w)  //true
// q.matchesEdge(e)  //false
// q.matchesEdge(r)  //false
// q.matchesEdge(t)  //false

//testing if DirectedGraph works with Node and Edge
var G = new DirectedGraph();
G.addNode(n1);
// G.addNode(n2);
G.getDetails();
// G.addNode(n2);
// G.getDetails();