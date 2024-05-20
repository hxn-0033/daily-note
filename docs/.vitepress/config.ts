import { defineConfig } from 'vitepress'
import sidebarConf from './router/sidebarConf'
import navConf from './router/navConf'

export default defineConfig({
    // head 会被渲染成 <link .... >
    base: '/dontkai-notes/',
    head: [
        ['link', { rel: 'icon', href: '/dontkai-notes/hero.png' }], // 页头icon
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }] // 字体
    ],
    lang: 'zh-CN',
    title: 'DontKai',
    description: 'DontKai 的documents',
    lastUpdated: true,
    markdown: {
        image: {
            lazyLoading: true
        }
    },
    themeConfig: {
        logo: '/hero.png',
        search: {
            provider: 'local'
        },
        nav: navConf,
        socialLinks: [{ icon: 'github', link: 'https://github.com/DontKai/dontkai-notes' }],
        sidebar: sidebarConf,
        outline: {
            level: [2, 6],
            label: '目录'
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        notFound: {
            title: '这里什么也没有，去首页看看吧',
            quote: '',
            linkText: '返回首页'
        },
        lastUpdated: {
            text: '最后更新于'
        },
        footer: {
            message: '基于 MIT 许可发布',
            copyright: 'Copyright © 2024-present DontKai'
        }
    }
})
