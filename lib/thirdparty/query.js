dojo.provide("thirdparty.query");

dojo.queryForOne = function (query, node) {
    var result = null;
    dojo.query(query, node).forEach(function (e) {
        //console.dir(e);
        if (result == null) {
            result = e;
        } else {
            console.error('dojo.queryForOne: query ' + query + ' returns more then one node!');
        }
    });
    if (result == null) {
        console.error('dojo.queryForOne: query ' + query + ' result is empty!');
    }
    return result;
};

dojo.findParent = function (node, filter) {
    var result;
    while (node.parentNode) {
        node = node.parentNode;
        var nodeList = dojo.NodeList(node).filter(filter);
        if (nodeList.length > 0) {
            result = nodeList[0];
            break;
        }
    }
    return result;
};