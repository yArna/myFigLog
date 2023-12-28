# MyFigLog | 分析我的 Figma 工作记录

**[https://moonvy.com/myfig/](https://moonvy.com/myfig/)**

![293128349-90790012-5165-4715-bbda-18968183cbb8](https://github.com/yArna/myFigLog/assets/82231420/ac7a1685-5c9b-416a-be57-8135249da315)


## 说明

这是个可以分析你的 Figma 工作记录的工具，能让你看到你每天的 Figma 工作状况，生成一个你的工作记录热点图

他通过扫描你每个的 Figma 文件历史版本数量来作为工作记录的依据。

 
> [!NOTE]  
> 具体来说，会检查你已登录的账号（支持多个账号），获取你账号的草稿和加入的团队（包含组织团队），扫描其中的每个文件的历史版本，过滤出属于你创建的历史版本，以历史版本创建时间作为工作的记录






## 使用

 
> [!TIP]  
> 所有操作仅在浏览器中完成，数据仅存储在你的浏览器中，不会向外发送任何数据


### 普通浏览器
 - 打开 **[https://moonvy.com/myfig/](https://moonvy.com/myfig/)** 找到里面的「启动书签」链接，添加到你的书签中。
 - 打开你的 [Figma](https://www.figma.com/files/recents-and-sharing/recently-viewed)，点击「启动书签」。


### Arc 浏览器

Arc 浏览器没有书签功能，所以你需要打开 [Figma](https://www.figma.com/files/recents-and-sharing/recently-viewed) 网页后 ，打开开发者工具（菜单: View > Devloper > Devloper Tool ），切换到 Console 输入以下代码，然后回车执行：

```js
 fetch("https://moonvy.com/myfig/script/myfig-app.js").then((r) => r.text().then((c) => eval(c)))
```

### Figma 客户端
 <img width="982" alt="image" src="https://github.com/yArna/myFigLog/assets/82231420/b59270ae-df56-48ec-8296-de2a3bf7131a">


- 打开开发者工具：菜单： Help（帮助）> Troubleshooting > Toggle Developer Tools
- 切换到 Console 输入以下代码，然后回车执行：
```js
 fetch("https://moonvy.com/myfig/script/myfig-app.js").then((r) => r.text().then((c) => eval(c)))
```
 
## 开发
这是一个 [Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) Web 应用


### 作为浏览器 Extension 来调试功能
```
npm run dev
```

### 作为普通网页来调试界面
```
npm run dev:html
```
