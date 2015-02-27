String.prototype.trimStart = function (c) {
    if (this.length == 0)
        return this;
    c = c ? c : ' ';
    var i = 0;
    var val = 0;
    for (; this.charAt(i) == c && i < this.length; i++);
    return this.substring(i);
};

String.prototype.trimEnd = function (c) {
    c = c ? c : ' ';
    var i = this.length - 1;
    for (; i >= 0 && this.charAt(i) == c; i--);
    return this.substring(0, i + 1);
};

String.prototype.trim = function (c) {
    return this.trimStart(c).trimEnd(c);
};

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

String.prototype.leadingUpper = function () {
    var result = "";
    if (this.length > 0) {
        result += this[0].toUpperCase();
        if (this.length > 1)
            result += this.substring(1, this.length);
    }
    return result;
};

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

String.prototype.isEmpty = function () {
    if (!this.match(/\S/)) {
        return true;
    }
    if (this == "&nbsp;") {
        return true;
    }
    return false;
};

function getParameterByName(name) {
    return getParameterByName(name, location.search);
};

function getParameterByName(name, urlToSearch) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(urlToSearch);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function getValueByKey(collection, key) {
    var keyValuePair = jQuery.grep(collection, function (value, id) {
        return value.Key == key;
    })[0];

    if (keyValuePair != undefined) return keyValuePair.Value;
    return '';
};

function getValueByProperty(collection, property, key) {
    var match = jQuery.grep(collection, function (value, id) {
        return value[property] == key;
    })[0];

    if (match != undefined) return match;
    return '';
};

function getValueWherePropertyContains(collection, property, key) {
    var match = jQuery.grep(collection, function (value, id) {
        return value[property].indexOf(key) != -1;
    })[0];

    if (match != undefined) return match;
    return '';
};

var sort_by = function (field, reverse, primer) {

    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = [-1, 1][+!!reverse];

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
};

function HandleError(data, status, headers, config) {
    console.log("Error: " + data + " " + status);
};

function isNumber(obj) {
    return !isNaN(parseFloat(obj));
};
