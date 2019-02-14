
const http = require('https');
const fetch = require('./fetch');
const patten = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
const { tokenId, token, domainId, recordId, dnspodApi } = require('./config')
const loginToken = `${tokenId},${token}`;


async function ddns() {
    var ipStr = await fetch.fetch('xyxy.tech', '/ip', null, "GET", null, 3001);
    var ip = patten.exec(ipStr)[0];

    console.log(ip);
    var public_data = {
        login_token: loginToken,
        format: "json"
    }
    if (!domainId) {
        console.warn(`need config "domainId" in config.js`);
        let domainList = await fetch.fetch(dnspodApi, '/Domain.List', public_data, 'POST',"json");
        console.log('here are your domains ');
        console.dir(domainList.domains);
        return;
    }
    if (!recordId) {
        console.warn(`need config "recordId" in config.js`);
        let recordList = await fetch.fetch(dnspodApi, '/Record.List', Object.assign({
            domain_id: domainId,
        }, public_data), "POST", 'json');
        console.log('here are your records ');
        console.dir(recordList.records);
        return;
    }


    let result = await fetch.fetch(dnspodApi, '/Record.Modify', Object.assign({
        domain_id: domainId,
        record_id: recordId,
        sub_domain: "ddns1",
        record_type: "A",
        record_line: "默认",
        value: ip

    }, public_data), "POST", 'json');//https://dnsapi.cn/Record.List
    console.log(result.status.message)
    console.log(result.record)
}

ddns();