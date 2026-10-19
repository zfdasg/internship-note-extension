# 简易便签浏览器插件

企业实习课程第三次作业，使用 HTML、CSS、JavaScript 和 Manifest V3，保持最简单实现。

## 功能

输入便签、保存、再次打开恢复、清空。最多 2000 字符。使用扩展页面 localStorage 保存，不联网，不申请额外权限。

## 安装

1. 下载官网 ZIP 并解压，或下载本仓库。
2. 手动进入 Chrome 的 `chrome://extensions` 或 Edge 的 `edge://extensions`。
3. 打开开发者模式，选择“加载已解压的扩展程序”。
4. 选择 `extension` 文件夹（ZIP 安装时选包含 manifest.json 的目录）。
5. 从工具栏扩展菜单打开“简易便签”。

便签需要点击保存。清空立即删除本地内容。卸载或清理扩展数据可能丢失便签。

## 官网与源码

- 官网：https://zfdasg.github.io/internship-note-extension/
- 源码：https://github.com/zfdasg/internship-note-extension

官网由 GitHub Pages 从 main 分支的 docs 目录发布，未上架浏览器商店。

## 文件

- extension/：插件源码，无需依赖和构建。
- docs/：官网、插件 ZIP 和效果图。
- evidence/：作业截图与验证记录。
