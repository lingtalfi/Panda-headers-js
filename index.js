const jsx = require('js-extension-ling');


var escapeCommaAndTrim = function (str) {
    return str.replace(/__panda_comma__/g, ",", str).trim();
};


function _getPandaHeaders(headers, arrays) {
    var ret = {};
    for (let v of headers) {
        var [key, value] = v;
        if ("panda__arrays" === key) {
            continue;
        }

        if (jsx.startsWith(key, "panda_")) {
            key = key.substr(6);


            if (jsx.inArray(key, arrays)) {
                if (false === jsx.arrayKeyExists(key, ret)) {
                    ret[key] = [];
                }
                let values = value.split(",");
                for (let j in values) {
                    let val = escapeCommaAndTrim(values[j]);
                    ret[key].push(val);
                }
            } else {
                value = escapeCommaAndTrim(value);
                ret[key] = value;
            }
        }

    }
    return ret;
}

var pandaHeaders = {

    getPandaHeaders: function (headers) {
        var arrays = [];
        if (headers.has("panda__arrays")) {
            arrays = headers.get('panda__arrays').split(",");
        }

        return _getPandaHeaders(headers, arrays);
    },
    getPandaHeadersByXMLHttpRequest: function (request) {


        // Get the raw header string
        var headers = request.getAllResponseHeaders();

        // Convert the header string into an array
        // of individual headers
        var arr = headers.trim().split(/[\r\n]+/);

        // Create a map of header names to values
        var headerMap = {};
        arr.forEach(function (line) {
            let parts = line.split(': ');
            let header = parts.shift();
            let value = parts.join(': ');
            headerMap[header] = value;
        });



        var arrays = [];
        if ("panda__arrays" in headerMap) {
            arrays = headerMap['panda__arrays'].split(",");
        }
        return _getPandaHeaders(Object.entries(headerMap), arrays);
    }
};


module.exports = pandaHeaders;