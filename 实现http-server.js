const http = require("http");
const fsp = require("fs").promises;
const querystring = require("querystring");

http.createServer((response, request) => {
  console.log("connected!")
  if (response.method == "GET") {
    let url = response.url;
    request.writeHead(200, {
      "content-Type": "text/html;charset=utf8",
    })
    let fullpath = "." + querystring.unescape(url);
    fsp.stat(fullpath).then(stat => {
      if (stat.isFile()) {
        fsp.readFile(fullpath).then(file => {
          request.end(file.toString());
          return;
        })
      } else if (stat.isDirectory()) {
        fsp.readdir(fullpath, { withFileTypes: true }).then(files => {
          for (let i = 0; i < files.length; i++) {
            if (files[i].name == "index.html") {
              fsp.readFile(files[i].name).then(data => {
                request.write(data.toString());
                request.end();
                return;
              })
            }
          }
          request.end(`
        <ul>
        ${files.map(file => {
            return `<li><a href ="${url == "/" ? "" : url}/${file.name}">${file.name}</a></li>`
          }).join("")}
        <ul>
        `)
        })
      }
    })

  }
}).listen(10011, () => {
  console.log("server is running on 10011");
});