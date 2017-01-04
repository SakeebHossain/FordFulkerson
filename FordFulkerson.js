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

//-------------------------------------------------------------------------------------------------
//TESTS--------------------------------------------------------------------------------------------
