const http = require('https');
function post(host, path, data, type) {
    var qs = require('querystring');
    var content = qs.stringify(data);
    var options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

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

function get(url,type){

}
module.exports = {
    post: post
}