/*
*
* 转发请求
* */
const https = require('https');
const querystring = require('querystring');
const http = require('http');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

var options = {
  hostname: 'www.jianshu.com',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
  }
}

const staticFn = {
  'themeDes': getThemeDes,
  'articleDet': getArticleDetail
}

let app = http.createServer((request, response) => {
  let url = request.url;

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT,DELETE, OPTIONS')

  if (request.method == 'OPTIONS') {
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    response.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    response.end();
    return;
  }

  if (request.method == 'POST') {
    let body = '';
    request.on('data', d => {
      body += d;
    })
    request.on('end', d => {
      getStaticData(url, response, body)
    })
  }

  if (request.method == 'GET') {
    getResponse(url, response)
  }

}).listen(3000)

// 代理请求
function getResponse(api, response) {
  var body = '';

  https.get(`https://www.jianshu.com/${api}`, (res) => {
    res.on('data', (d) => {
      body += d;
    })
    res.on('end', (d) => {
      response.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      response.end(body)
    })
  })

}

// 爬取静态数据
function getStaticData(url, response, body) {
  let newUrl = url.replace(/\/(\w)+\//g, '');
  console.log(newUrl)
  staticFn[newUrl](response, body)
}


// 爬取静态数据
function getStaticData(url, response, body) {
  let newUrl = url.replace(/\/(\w)+\//g, '');

  staticFn[newUrl](response, body)
}

function getHtml(url = '/') {
  options.path = url;
  return new Promise((reslove, reject) => {
    try {
      let body = '';
      let chunks = [];
      https.get(options, (res) => {
        res.on('data', (d) => {
          body += d;
          chunks.push(d)
        })
        res.on('end', (d) => {
          var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
          let $ = cheerio.load(html,{decodeEntities: false})
          reslove($)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

// 获取专栏介绍
function getThemeDes(response, body) {
  body = JSON.parse(body)
  let url = `/c/${body.id}`;
  return getHtml(url).then($ => {

    let res = {
      img: $('.collection-info .avatar').attr('src'),
      name: $('.collection-info .name').html(),
      desc: $('.collection-info .desc').html(),
      info: $('.collection-info .intro').html()
    }
    //console.log(res)
    response.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    response.end(JSON.stringify(res))
  }).catch(e => {})
}

// 获取文章详情
function getArticleDetail(response, body){
  body = JSON.parse(body)
  let url = `/p/${body.id}`;
  return getHtml(url).then($ => {
    console.log($('#note-show img[data-original-src]'))
    $('#note-show img[data-original-src]').each(function (i, item) {
      $(this).attr('src', $(this).attr('data-original-src'))
    })
    let res = {
      note: $('#note-show').html()
    }


    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify(res))
  }).catch(e => {})

}

