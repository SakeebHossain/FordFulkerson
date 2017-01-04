//Graph (using Adjacency matrix)------------------------------------------------------------------
function Graph() {
    ////METHODS
    this.adjMatrix = [];  //[i][j] : i is the name of the 'from' node and j is the 'to' node
    this.idList = [];

    this.addNode = function(id) {
        //make sure id is unique
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id) {
                console.log("A node with id", id, "already exists!");
                return;
            };
        };
        //initialize new row with -inf's based on len of idlist
        var newRow = [];
        for (i = 0; i < this.idList.length; i++) {
            newRow[i] = -Infinity;
        };
        //add new row (append new list)
        this.adjMatrix.push(newRow);
        //add new id to idList
        this.idList.push(id);
        //add new columns in each row (go through each row in matrix, append -inf) to matrix
        for (i = 0; i < this.idList.length; i++) {
            this.adjMatrix[i].push(-Infinity);
        };
    };

    this.deleteNode = function(id) {
        var found = false;
        var index;

        //confirm node exists
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id) {
                    found = true;
                    index = i;
                    break;
                };
        };

        if (found == false) {
            console.log("The node with id", id, "wasn't found.");
            return;
        };

        //if found, find its index in the idList, k
        for (i = 0; i < this.adjMatrix.length; i++) {
            if (this.idList[i] == id) {
                index = i;
                break;
            }
        };

        //splice out the [index]th element in idList
        this.idList.splice(index, 1);

        //splice out the [index]th row in adjMatrix
        this.adjMatrix.splice(index, 1);

        //splice out [index]th element from all other arrays
        for (i = 0; i < this.adjMatrix.length; i++) {
            this.adjMatrix[i].splice(index, 1);
        };
    };

    this.addEdge = function(id1, id2, weight) {
    //NOTE: id1 is the 'from' node and id2 is the 'to' node
    //NOTE: use this method to "update" edge weights as well
    //confirm if id1 and id2 are found in idList, confirming nodes are in graph
    //also find index of id1, i, and id2, j, in idList
        found1 = false;
        found2 = false;
        var index1, index2;
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id1 || this.idList[i] == id2) {
                if (this.idList[i] == id1) {found1 = true; index1 = i;};
                if (this.idList[i] == id2) {found2 = true; index2 = i;};
            };
        };

        if ((found1 && found2) != true) {
            console.log("One of the nodes you provided aren't in the graph, so the edge can't be made.");
            return;
        };
        this.adjMatrix[index1][index2] = weight;
    };

    this.deleteEdge = function(id1, id2) {
    //NOTE: id1 is the 'from' node and id2 is the 'to' node
    //confirm if id1 and id2 are found in idList, confirming nodes are in graph
    //also find index of id1, i, and id2, j, in idList
        found1 = false;
        found2 = false;
        var index1, index2;
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id1 || this.idList[i] == id2) {
                if (this.idList[i] == id1) {found1 = true; index1 = i;};
                if (this.idList[i] == id2) {found2 = true; index2 = i;};
            };
        };

        if ((found1 && found2) != true) {
            console.log("One of the nodes you provided aren't in the graph, so the edge can't be made.");
            return;
        };
        this.adjMatrix[index1][index2] = -Infinity;
    };
        
    this.print = function() {
        console.log("FROM\\TO", this.idList);
        for (i = 0; i < this.adjMatrix.length; i++) {
            console.log("'" + this.idList[i] + "'", this.adjMatrix[i], "\n");
        };
        console.log("\n");
    };

    //getedges() : returns a list of edges in the format (from, to)

    this.getNeighbours = function(id) {
        //description : returns all nodes reachable from the provided node
        //find index of id in idList 
        var found = false;
        var index;

        //confirm node exists
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id) {
                    found = true;
                    index = i;
                    break;
                };
        };
        

        //if it doesn't exist, tell 'em
        if (found == false) {
            console.log("The node with id", id, "wasn't found.");
            return;
        };

        //make array of neighbours
        neighbours = [];
        for (i = 0; i < this.adjMatrix[index].length; i++) {
            if (this.adjMatrix[index][i] != -Infinity) {
                neighbours.push(this.idList[i]);
            };
        };
        return neighbours;
    };
};

//Queue--------------------------------------------------------------------------------------------
function Queue() {
        var queue = [];
        
        this.dequeue = function() {
            if (queue.length == 0) {
                return undefined;
            } else {
                return queue.shift();
            }
        };
        
        this.enqueue = function(item) {
            queue.push(item);
        };

        this.getLength = function() {
            return queue.length;
        };

        this.isEmpty = function() {
            return (queue.length == 0);
        };

        this.getContents = function() {
            return queue;
        };
    };

//Breadth First Search-----------------------------------------------------------------------------
function BFS() {
    //
};

//Ford-Fulkerson-----------------------------------------------------------------------------------

//TESTS--------------------------------------------------------------------------------------------
var G = new Graph();

// // Testing Graph.addNode
G.addNode("A");
G.addNode("B");
G.addNode("C");
// G.addNode("B"); //should fail
// G.print();

// // Testing Graph.deleteNode
// G.deleteNode("node2");
G.addEdge("A", "B", 4);
G.addEdge("A", "C", 3);
G.addEdge("B", "A", 1);
G.print();

// // Testing Graph.addEdge
// G.addEdge("node2", "node4", 10);
// G.print();

// // Testing Graph.deleteEdge
// console.log(G.getNeighbours("B"));