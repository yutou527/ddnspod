
const http = require('https');
const fetch = require('./fetch');
const patten = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
const { ipUrl, tokenId, token } = require('./config')
const loginToken = `${tokenId},${token}`;
console.log(ipUrl, tokenId, token);

getDomainsAsync();

async function getDomainsAsync() {
    var post_data = {
        login_token: loginToken,
        format: "json"
    }
    let rst = await fetch.post('dnsapi.cn', '/Domain.List', post_data);
    console.log('rst', rst);
}
function getDomains() {
    var qs = require('querystring');

    var post_data = {
        login_token: `${tokenId},${token}`,
        format: "json"
    }

    var content = qs.stringify(post_data);

    var options = {
        hostname: 'dnsapi.cn',
        port: 443,
        path: '/Domain.List',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    console.log(content)
    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body  
    req.write(content);

    req.end();
}