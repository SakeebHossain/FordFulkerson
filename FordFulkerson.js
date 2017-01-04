//Graph (using Adjacency matrix)------------------------------------------------------------------
function Graph() {
    ////METHODS
    this.adjMatrix = [];  //[i][j] : i is the name of the 'from' node and j is the 'to' node
    this.idList = [];

    //addNode(id)
    /*
    -must provide an id (basically, the name)
    -add new row (append new list) and column (go through each row in matrix, append -inf) to matrix
    -append id to idList
    */

    //deleteNode(id)
    /*
    -find its index in the idList, i
    -remove ith row in adjMatrix
    -splice out ith element from all other arrays
    */

    //addEdge(id1, id2)
    /*
    -from node (id1) and to node (id2)
    -confirm if id1 and id2 are found in idList, confirming nodes are in graph
    -find index of id1, i, and id2, j, in idList
    -update adjMatrix[i][j]
    */

    //deleteEdge(id1, id2)
    /*
    -same 'from', 'to' thing
    -set adjMatrix to -inf
    */

    //print
    /*
    -print very row of adjMatrix
    */
};
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
                return true;
            };
        };
        return false;
    };

    this.isConnectedTo = function(aNode) {
        //returns true if the provided node is involved with anEdge
        if (this.from.getID() == aNode.getID() || this.to.getID() == aNode.getID()) {
            return true;
        }; return false;
    }
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

    this.getNeighbours = function(aNode) {
        //finds all the nodes connected to aNode by an edge
        var neighbours = [];
        for (i = 0; i < this.edges.length; i++) {
            if ((this.edges[i]).isConnectedTo(aNode)) {
                neighbours.push(this.edges[i]);
            };
        };
        return neighbours;
    };

    this.deleteEdge = function(badEdge) {
        for (i = 0; i < this.edges.length; i++) {
            if (this.edges[i].matchesEdge(badEdge)) {
                this.edges.splice(i, 1);
                return;
            };
        };
        console.log("Edge", badEdge.id, "not found...\n");
        return;
    };


    this.deleteNode = function(badNode) {
        for (i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].matchesNode(badNode)) {
                this.nodes.splice(i, 1);
            };
        }; 
        //also delete all edges connecting to the badNode
        var neighbours = this.getNeighbours(badNode);
        for (j = 0; j < 2; j++) {
            console.log('currently deleting edge', neighbours[j].id, j);
            this.deleteEdge(neighbours[j]);
            //break;
        };
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

//Residual Graph Object----------------------------------------------------------------------------
function ResidualGraph(G) {
    this.nodes = [];
    this.forwardEdges = [];
    this.backwardEdges = [];
    this.edges = [];

    this.init = function() {
        //add forward edges, and create and add backward edges
        for (i = 0; i < G.edges.length; i++) {
            this.forwardEdges.push(G.edges[i]);
            be = this.convertToBackEdge(G.edges[i]);
            this.backwardEdges.push(be);
            this.edges.push(G.edges[i]);
            this.edges.push(be);
        };
        
        //add nodes
        for (i = 0; i < G.nodes.length; i++) {
            this.nodes.push(G.nodes[i]);
        };
    };

    this.convertToBackEdge = function(anEdge) {
        var reversedEdge = new Edge(anEdge.getTo(), anEdge.getFrom(), 0);
        return reversedEdge; 
    };

    this.init();    
};

ResidualGraph.prototype = new DirectedGraph();

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
// console.log("# INITIALIZING GRAPH:\n");
// var G = new DirectedGraph();
// G.addNode(n1);
// G.addNode(n2);
// G.addNode(n3);
// G.addEdge(q);
// G.addEdge(e); 
// G.getDetails();
// console.log('after deletion.........................');
// G.deleteNode(n1);
// G.getDetails();

// console.log("# TESTING Graph.getNeighbours:\n");
// var n = G.getNeighbours(n1);
// for (i = 0; i < n.length; i++) {
//     console.log(n[i].getDetails());
// };

// var x = new ResidualGraph(G);
// console.log(x.getNeighbours(n1));