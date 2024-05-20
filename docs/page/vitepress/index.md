# 搭建 vitepress

## 安装 vitepress

### 前置准备

-   Node.js 18 及以上版本。

1. 首先创建并进入新目录

```sh
$ mkdir my-vitepress && cd my-vitepress
```

2. 初始化项目

```sh
$ pnpm init
```

3. 安装 vitepress

:::code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

:::

### 文件结构(手动创建)

```
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme          // 文件夹：存放主题相关文件
│  │  └─ config.ts      // 配置文件
│  ├─ page              // 文件夹：存放md文件
│  ├─ public            // 文件夹：存放公共资源
│  └─ index.md          // vitepress 主页
└─ package.json
```

### index.md(首页)

```md
---
layout: home
hero:
    name: Dontkai
    text: 由 Vite 和 Vue 驱动的静态站点生成器
    tagline: 将 Markdown 变成优雅的文档，只需几分钟
    image:
        src: /hero.png
        alt: Dontkai
    actions:
        - theme: brand
          text: 开始阅读 →
          link: /page/frontend/JavaScript/1_Deep/1_Prototype
        - theme: alt
          text: 搭建vitepress
          link: /page/vitepress/
features:
    - icon:
          src: /read.svg
      title: 读书
      details: 随笔川迹,文以载道,虚心学习,自省自知,多读一页书,就少一分无知,多一分智慧
    - icon:
          src: /technology.svg
      title: 技术
      details: 用心记录技术,走心分享,始于前端,不止于前端,励志成为一名优秀的全栈工程师,真正的实现码中致富
    - icon:
          src: /life.svg
      title: 生活
      details: 无分享,不生活,一个具有情怀的技匠,路上正追逐斜杠青年的践行者
---
```

### config.ts(配置文件)

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/xxxx/', // 根目录
    head: [
        ['link', { rel: 'icon', href: '/xxxx/hero.png' }], // 页头icon
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }] // 字体
    ],
    lang: 'zh-CN', // 语言
    title: 'xxxx', // 标题
    description: 'xxxx', // 描述
    lastUpdated: true, // 开启最后更新时间
    markdown: {
        image: {
            lazyLoading: true // 图片懒加载
        }
    },
    themeConfig: {
        // 主题logo
        logo: '/xxxx.png',
        search: {
            provider: 'local' // 本地搜索
        },
        // 导航栏
        nav: [],
        // 侧边栏
        sidebar: [],
        // 带有图标的社交帐户链接
        socialLinks: [{ icon: 'github', link: 'https://github.com/xxxx/xxxx' }],
        // 右侧目录
        outline: {
            level: [2, 6],
            label: '目录'
        },
        // 上下页
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        // 404页面
        notFound: {
            title: '这里什么也没有，去首页看看吧',
            quote: '',
            linkText: '返回首页'
        },
        // 最后更新时间
        lastUpdated: {
            text: '最后更新于'
        },
        // 主题页脚内容
        footer: {
            message: '基于 MIT 许可发布',
            copyright: 'Copyright © 2024-present xxxx'
        }
    }
})
```

## 扩展

### 自定义容器

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Github Page 部署

在 github 上创建仓库，并是 public 状态的。并将代码提交到 master 或者 main 分支

```sh
git add .
git commit -m "xxx"
git push origin xxxxx
```

**deploy.sh 脚本代码**
在根目录下创建 deploy.sh 文件脚本

```sh
#!/usr/bin/env sh

# 忽略错误
set -e  #有错误抛出错误

# 构建
pnpm docs:build  #然后执行打包命令

# 进入待发布的目录
cd docs/.vitepress/dist  #进到dist目录

git init  #执行这些git命令
git add -A
git commit -m 'deploy'

git push -f git@github.com:xxx/xxxx.git master:github-pages  #提交到这个分支

cd -

rm -rf docs/.vitepress/dist  #删除dist文件夹
```

**package.json 中添加 scripts**

```json
{
    "scripts": {
        "docs:deploy": "sh deploy.sh"
    }
}
```

执行完后再在 github 当前项目的仓库中的 settings => Pages 设置如下图所示：

<div align=center>
    <img src=./assets/0_github.png width=100% />
</div>

## 参考资料

[vitepress 中文官网](https://vitepress.dev/zh/)

[使用 VitePress 创建个人网站并部署到 GitHub](https://blog.csdn.net/Dandrose/article/details/131201315)

[VitePress 搭建个人网站手把手教学](https://blog.csdn.net/z010202/article/details/127555805)

[vitepress 从 0 到 1，让每个前后端小伙伴都拥有一个属于自己的博客](https://blog.csdn.net/weixin_44803753/article/details/130903396)

[使用 VitePress 打造个人前端导航网站](https://juejin.cn/post/7204860462239498296#heading-0)

[vuepress 博客搭建系列 - 保姆级教程](https://juejin.cn/column/7041871760995647502)
