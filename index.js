const jsx = require('js-extension-ling');



var pandaHeaders = {

    getPandaHeaders: function (headers) {
        var ret = {};
        var arrays = [];

        var escapeCommaAndTrim = function (str) {
            return str.replace(/__panda_comma__/g, ",", str).trim();
        };


        if (headers.has("panda__arrays")) {
            arrays = headers.get('panda__arrays').split(",");
        }


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
    },
};


modules.exports = pandaHeaders;