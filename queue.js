/* Queue - An implementation of the queue data structure */

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