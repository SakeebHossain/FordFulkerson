/*exports*/
module.exports.Node = Node;

function Node(id) {
    var id = id;
    this.getID = function() {
    	return id;
    };

    this.isMatch = function(otherNode) {
    	if (id == otherNode.getID()) {
    		return true;
    	}
    	return false;

    };
};