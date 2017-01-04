/* BREADTH FIRST SEARCH */

function breadthFirstSearch(G, src, destination) {
    
    pred, dist = {};
    Q = new Queue();

	for (var node in G.edges()) {
		pred[i] = undefined;
		dist[i] = Infinity;
	}

	Q.enqueue(src);
	dist[src] = 0; 

	while(!Q.isEmpty()) {
		var current = Q.dequeue();

		if (G.neighbours(current) == undefined) {
			continue;
		};

		for (var neighbour in G.getNeighbours(current)) {
			pred[neighbour] = current;
			dist[neighbour] = dist[current] + 1;

			if (neighbour == destination) {
				return {"path" : getPath(pred, src, destination),
				        "dist" : dist[destination]
				    };
			};

            Q.enqueue(neighbour);
		};
	};
};

function getPath(pred, src, dest) {
    var current = dest;
    path = [];
    while (current != undefined) {
    	path.unshift(current);
    	current = prev[current];
    }
    return path;
};