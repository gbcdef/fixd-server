[![downloads](https://img.shields.io/npm/dt/fixd-server.svg)](#)
[![license](https://img.shields.io/badge/license-MIT_License-lightgrey.svg)](#)

# fixd-server

Quickly establish a server for design document, html files generated by axure or omnigraffle, etc. So that everyone can view your design on the Internet or Intranet.

快速建立静态HTML设计文档（Axure等软件生成）服务器。

# Usage
使用方法

On Windows, by default the html files generated by Axure are in `~/Documents/Axure/HTML/`. It should be like:

Windows系统下，Axure生成的HTML文件默认在`~/Documents/Axure/HTML/`下，目录结构如下：

```
HTML/
| - project_1/
|   | - index.html
|   | - ...
| - project_2/
|   | - index.html
|   | - ...
| - ...
```

In that case, just do as follows:

此时，执行：

```bash
$ npm i -g fixd-server
$ fixd-server ~/Documents/Axure/HTML
```

# Options
选项

Serve at perticular port:

指定服务器端口：

```bash
$ fixd-server html -p 80
```

# License
MIT
