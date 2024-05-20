/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-04-12 14:20:56
 */
import { DefaultTheme } from 'vitepress'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/frontend/JavaScript/': JavaScript,
    '/page/frontend/Vue/': Vue
}

export default sidebarConf
