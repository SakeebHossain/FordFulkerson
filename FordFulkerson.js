//Graph (using Adjacency matrix)------------------------------------------------------------------
function Graph() {
    ////METHODS
    this.adjMatrix = [];  //[i][j] : i is the name of the 'from' node and j is the 'to' node
    this.idList = [];

    this.addNode = function(id) {
        //make sure id is unique
        for (i = 0; i < idList.length; i++) {
            if (idList[i] == id) {
                console.log("A node with id", id, "already exists!");
                return;
            };
        };
        //initialize new row with -inf's based on len of idlist
        var newRow = [];
        for (i = 0; i < idList.length; i++) {
            newRow[i].append(-Infinity);
        };
        //add new row (append new list)
        this.adjMatrix.push(newRow);
        //add new id to idList
        this.idList.push(id);
        //add new columns in each row (go through each row in matrix, append -inf) to matrix
        for (i = 0; i < idList.length; i++) {
            this.adjMatrix[i].push(-Infinity);
        };
    };

    //deleteNode(id)
    /*
    -confirm node exists
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

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
