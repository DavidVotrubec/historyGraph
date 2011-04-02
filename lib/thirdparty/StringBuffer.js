dojo.provide('thirdparty.StringBuffer');

function StringBuffer(/*string*/str) {
    this.buffer = [];
    if (str != undefined) this.buffer.push(str);
}

StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};

StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};