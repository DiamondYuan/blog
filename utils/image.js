const hostname = "diamondyuan.oplinjie.cn";

function replaceHost(originUrl) {
    const url = new URL(originUrl);
    url.hostname = hostname
    return url.href;
}

module.exports = { replaceHost }