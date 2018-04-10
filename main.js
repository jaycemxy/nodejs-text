window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function ({url,method,body,successFn,failFn,headers}) {
    let request = new XMLHttpRequest()  // 创建新对象
    request.open(method, url)  // 配置这个request对象
    for (let key in headers) {  
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {  //监听这个对象的readystate变化
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)  //发送这个对象
}

function f1(responseText) {}

function f2(responseText) {}

myButton.addEventListener('click', (e) => {
    window.jQuery.ajax({
        url: '/frank',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        },
        successFn: (x) => {
            f1.call(undefined, x)
            f2.call(undefined, x)
        },
        failFn: (x) => {
            console.log(x)
            console.log(x.status)
            console.log(x.responseText)
        }
    })
})