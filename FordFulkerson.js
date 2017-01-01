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

function Edge(nodeFrom, nodeTo, capacity) {
    this.from = nodeFrom;
    this.to = nodeTo;
    this.capacity = capacity;
    this.id = [nodeFrom.getID(), nodeTo.getID()];

    this.getID = function () {
        return this.id;
    };

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

    this.updateCapacity = function(newCapacity) {
        this.capacity = newCapacity;
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
        for (i = 0; i < this.edges.length; i++) {
            if (this.edges[i].matchesEdge(newEdge)) {
                console.log("An edge connecting these nodes already exists.\n");
                return;
            };
        };

        //check if the required nodes are in the graph
        for (i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].matchesNode(newEdge.getTo())) {
                for (i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i].matchesNode(newEdge.getFrom())) {
                        this.edges.push(newEdge);
                        return;
                    };
                };
                console.log("This edge requires node", newEdge.getFrom().getID(), "to exist.");
                return;
            };
        };
        console.log("This edge requires node", newEdge.getTo().getID(), "to exist.");
        return;
    };

    this.addNode = function(newNode) {
        //check if node already exists
        for (i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].matchesNode(newNode)) {
                console.log("The node id '" + newNode.getID() + "' is already taken.\n");
                return;
            };
        };
        this.nodes.push(newNode);
    };

    this.deleteEdge = function(badEdge) {
        for (i = 0; i < this.edges.length; i++) {
            if (this.edges[i].matchesEdge(badEdge)) {
                this.edges.splice(i, 1);
                return;
            };
        };
        console.log("Specified edge not found...\n")
    };


    this.deleteNode = function(badNode) {
        for (i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].matchesNode(badNode)) {
                this.nodes.splice(i, 1);
                return;
            };
        };
        //to-do: also delete all edges connecting to it
        console.log("Specified node not found...\n")
    };

    this.getNeighbours = function() {
        //to-do
    };

    this.getDetails = function () {
        
        var n = [];
        var e = [];
        for (i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] == undefined) {
                console.log('fail node');
            } else {
                console.log('node found!---------------------->', this.nodes[i].getID());
                n.push(this.nodes[i].getID());
            }
        };  
        for (i = 0; i < this.edges.length; i++) {
            if (this.edges[i] == undefined) {
                console.log('fail edge');
            } else {
                e.push('[' + this.edges[i].getID() + ']');
                console.log('edge found!---------------------->', this.edges[i].getID());
            };
        };
        console.log("The graph contains the following nodes... " + n);
        console.log("The graph contains the following edges... " + e +"\n");
    };
};

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
// //testing if Node and Edge work together, and their methods
var n1 = new Node('n1');
var n2 = new Node('n2');
var n3 = new Node('n3');
var n4 = new Node('n4');
var n5 = new Node('n1');
var q = new Edge(n1, n2, 1);
var w = new Edge(n1, n2, 1);
var e = new Edge(n1, n3, 1);
var r = new Edge(n3, n2, 1);
var t = new Edge(n3, n4, 1);

// console.log(n1.getID(), n1.id);
// console.log(q.getDetails());

// q.matchesEdge(w)  //true
// q.matchesEdge(e)  //false
// q.matchesEdge(r)  //false
// q.matchesEdge(t)  //false

// console.log(n1.matchesNode(n5))  //true
// console.log(n1.matchesNode(n2))  //false

//testing if DirectedGraph works with Node and Edge
// var G = new DirectedGraph();
// G.addNode(n1);
// G.addNode(n2);
// G.addNode(n3);
// G.addEdge(q);
// G.addEdge(t); 
// G.getDetails();
// G.deleteNode(n2);
// G.getDetails();