/**
 * 简易的post get请求工具
 * 默认https
 */
function fetch(host, path, data, method, type, port) {
    var http = require('https');
    if (port)
        http = require('http')
    var qs = require('querystring');
    var content = qs.stringify(data);
    var options;
    if (method == 'POST') {
        options = {
            hostname: host,
            port: port || 443,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
    } else {
        options = {
            hostname: host,
            port: port || 443,
            path: path + '?' + content,
            method: 'GET'
        };
    }


    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {

            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                if (type == 'json') {
                    resolve(JSON.parse(chunk));
                } else {
                    resolve(chunk);
                }
            });

            req.on('error', function (e) {
                console.warn('fetch.js error : ' + e.message);
            });

        });
        req.write(content);

        req.end();
    });
}

module.exports = {
    fetch: fetch
}