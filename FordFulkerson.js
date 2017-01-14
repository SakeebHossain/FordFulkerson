//Graph (using Adjacency matrix)------------------------------------------------------------------
function Graph() {
    ////METHODS
    this.adjMatrix = [];  //[i][j] : i is the name of the 'from' node and j is the 'to' node
    this.idList = [];
};

    Graph.prototype.addNode = function(id) {
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

    Graph.prototype.deleteNode = function(id) {
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

    Graph.prototype.addEdge = function(id1, id2, weight) {
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
        this.adjMatrix[index1][index2] = weight;
    };

    Graph.prototype.updateEdge = function(id1, id2, newWeight) {
        //NOTE : this method is the same as addEdge. Only added it for readability
        this.addEdge(id1, id2, newWeight);
    };

    Graph.prototype.deleteEdge = function(id1, id2) {
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
        
    Graph.prototype.print = function() {
        console.log("FROM\\TO", this.idList);
        for (i = 0; i < this.adjMatrix.length; i++) {
            console.log("'" + this.idList[i] + "'", this.adjMatrix[i], "\n");
        };
        console.log("\n");
    };

    //getedges() : returns a list of edges in the format (from, to)

    Graph.prototype.getIdIndex = function(id) {
        for (i = 0; i < this.idList.length; i++) {
            if (id == this.idList[i]) {
                return i;
            };
        };
        console.log("node with id", id, "doesn't exist in this graph.");
        return undefined;
    };

    Graph.prototype.getNeighbours = function(id) {
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
            if (this.adjMatrix[index][i] != -Infinity && this.adjMatrix[index][i] != 0) {  //if edge cap is 0, it can't carry flow, so it might as well not exist...
                neighbours.push(this.idList[i]);
            };
        };
        return neighbours;
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
function BFS(G, src, destination) {
    
    pred = {};
    dist = {};
    visited = [src];
    Q = new Queue();
    
    for (q = 0; q < G.idList.length; q++) {
        cur = G.idList[q];
        pred[cur] = undefined;
        dist[cur] = Infinity;
    }

    Q.enqueue(src);
    dist[src] = 0; 

    while(Q.isEmpty() == false) {
        //console.log("DEBUGGING", Q.getContents().length);
        var current = Q.dequeue();

        if (G.getNeighbours(current) == undefined) {
            continue;
        };

        var neighbours = G.getNeighbours(current);
        for (i = 0; i < neighbours.length; i++) {
            if (!visited.includes(neighbours[i])) {
                pred[neighbours[i]] = current;
                dist[neighbours[i]] = dist[current] + 1;

                if (neighbours[i] == destination) {
                    //console.log('DEBUGGING----------------------------')
                    //console.log("DEBUGGING", pred);
                    return {
                        "path" : getPath(pred, src, destination),
                        "dist" : dist[destination],
                        "visited" : visited
                    };
                };
                //make sure we haven't visited the node already

                visited.push(neighbours[i]);
                Q.enqueue(neighbours[i]);
            };
        };
    };
    return {
            "path" : [],
            "dist" : 0,
            "visited" : visited
            };
};

function getPath(pred, src, dest) {
    var current = dest;
    path = [];
    while (current != undefined) {
        path.unshift(current);
        current = pred[current];
    };
    return path;
};

//Residual Graph-----------------------------------------------------------------------------------

ResidualGraph.prototype = new Graph();

function ResidualGraph(G) {

    this.adjMatrix = [];
    this.idList = [];
    
    this.init = function(G) {
        //deep cloning the adjMatrix and idList
        for (i = 0; i < G.adjMatrix.length; i++) {
            row = [];
            for (j = 0; j < G.adjMatrix[i].length; j++) {
                row.push(G.adjMatrix[i][j]);
            };
            this.adjMatrix.push(row);
            this.idList.push(G.idList[i]);
        };

        //adding the residual edges
        for (i = 0; i < G.adjMatrix.length; i++) {
            for (j = 0; j < G.adjMatrix[i].length; j++) {
                if (i != j && G.adjMatrix[i][j] != -Infinity) {
                    this.adjMatrix[j][i] = 0;
                };
            };
        };
    };
    this.init(G);  //run the init on creation of an instance!

    this.minCapacity = function(path) {
        var min = Infinity;
        for (i = 1; i < path.length; i++) {
            from = path[i-1];
            to = path[i];
            var fromIndex;
            var toIndex;
            for (j = 0; j < this.idList.length; j++) {
                if (this.idList[j] == from) {
                    fromIndex = j;
                };
                if (this.idList[j] == to) {
                    toIndex = j;
                };
            };
            value = this.adjMatrix[fromIndex][toIndex];
            if (value < min) {
                min = value;
            };
        };
        //console.log("DEBUGGING",'found min to be', min);
        return min;
    };

    this.adjustEdgesInPath = function(path, val) {
        //adds val to each edge on path

        //iterate through the path
        for (j = 1; j < path.length; j++) {
            from = this.getIdIndex(path[j-1]);
            to = this.getIdIndex(path[j]);
            
            if (from == undefined || to == undefined) {
                console.log('something went wrong...');
                return;
            };
            
            currentVal = this.adjMatrix[from][to];
            this.adjMatrix[from][to] -= val;
            this.adjMatrix[to][from] += val;
        };
    };
};

//Ford-Fulkerson-----------------------------------------------------------------------------------
function FordFulkerson(G, src, sink) {

    var RS = new ResidualGraph(G);

    console.log("DEBGGING BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEGGGGGGGGGGGGGGGGIN");
    RS.print();

    while (true) {
        res = BFS(RS, src, sink);
        path = res['path'];
        //console.log("DEBUGGING", res['visited']); 
        if (path.length == 0) {
            break;
        };
  
        //find min
        var min = RS.minCapacity(path);
        RS.adjustEdgesInPath(path, min);

        console.log("DEBUGGING",'BFS found a min of', min, 'on this path:', path);
        RS.print();


    };
    
    S = res['visited'];
    //visited now contains all nodes in the S part of the S-T cut. Find all out-going from them.
    cut = new Set();
    flow = 0;
    for (k = 0; k < S.length; k++) {
        var s = G.getNeighbours(S[k]);
        x = G.getIdIndex(S[k]);
        for (l = 0; l < s.length; l++) {
            if (!S.includes(s[l])) {
               cut.add([ S[k], s[l]]);
               flow += G.adjMatrix[G.getIdIndex(S[k])][G.getIdIndex(s[l])];
            };
        };
    };

    console.log(flow);
    console.log(cut);

}; 

//TESTS--------------------------------------------------------------------------------------------
var G = new Graph();

G.addNode("s");
G.addNode("2");
G.addNode("3");
G.addNode("4");
G.addNode("5");
G.addNode("6");
G.addNode("7");
G.addNode("t");

G.addEdge("s", "2", 10);
G.addEdge("s", "3", 5);
G.addEdge("s", "4", 15);

G.addEdge("2", "3", 4);
G.addEdge("2", "6", 15);
G.addEdge("2", "5", 9);

G.addEdge("3", "4", 4);
G.addEdge("3", "6", 8);

G.addEdge("4", "7", 30);

G.addEdge("5", "6", 15);
G.addEdge("5", "t", 10);

G.addEdge("6", "7", 15);
G.addEdge("6", "t", 10);

G.addEdge("7", "3", 6);
G.addEdge("7", "t", 10);


FordFulkerson(G, "s", "t");