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
        var k;
        
        //confirm node exists
        for (i = 0; i < this.idList.length; i++) {
            if (this.idList[i] == id) {
                    found = true;
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

        //splice out the kth element in idList
        this.idList.splice(index, 1);

        //splice out the kth row in adjMatrix
        this.adjMatrix.splice(index, 1);

        //splice out kth element from all other arrays
        for (i = 0; i < this.adjMatrix.length; i++) {
            this.adjMatrix[i].splice(k, 1);
        };
    };

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
    this.getDetails = function() {
        console.log(this.idList);
        for (i = 0; i < this.adjMatrix.length; i++) {
            console.log(this.idList[i], this.adjMatrix[i], "\n");
        };
        console.log("\n");
    };

    //getedges() : returns a list of edges in the format (from, to)
};

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
var G = new Graph();
//Testing Graph.addNode
G.addNode("node1");
G.addNode("node2");
G.addNode("node3");
G.addNode("node2"); //should fail
G.getDetails();
//Testing Graph.deleteNode
G.deleteNode("node2");
G.getDetails();