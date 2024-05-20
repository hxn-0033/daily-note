<template>
    <div class="ui-home">
        <h2 class="ui-title">前端官网推荐</h2>
        <div class="ui-project">
            <div class="item" v-for="item in siteData" :key="item.name">
                <a class="link" :href="item.link" target="_blank">
                    <h3 :class="['title', item.className]">{{ item.name }}</h3>
                    <p class="desc">{{ item.desc }}</p>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const siteData = [
    {
        name: 'Vite',
        link: 'https://cn.vitejs.dev/',
        className: 'color-gradient1',
        desc: '下一代的前端工具链'
    },
    {
        name: 'Vue',
        link: 'https://cn.vuejs.org/',
        className: 'color-gradient2',
        desc: '渐进式 JavaScript 框架'
    },
    {
        name: 'Vue Router',
        link: 'https://router.vuejs.org/zh/',
        className: 'color-gradient3',
        desc: 'Vue.js 的官方路由'
    },
    {
        name: 'Pinia',
        link: 'https://pinia.vuejs.org/zh/',
        className: 'color-gradient4',
        desc: '符合直觉的 Vue.js 状态管理库'
    },
    {
        name: 'TailwindCSS',
        link: 'https://www.tailwindcss.cn/',
        className: 'color-gradient5',
        desc: '只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。'
    },
    {
        name: 'UnoCSS',
        link: 'https://unocss.uihtm.com/',
        className: 'color-gradient6',
        desc: '即时按需引用的原子css引擎'
    },
    {
        name: 'VueUse',
        link: 'https://www.vueusejs.com/',
        className: 'color-gradient7',
        desc: '基于Vue组合式API的实用工具集'
    },
    {
        name: 'VueHooks Plus',
        link: 'https://inhiblabcore.github.io/docs/hooks/',
        className: 'color-gradient8',
        desc: 'Vue3 的 Hooks'
    }
]
</script>
<style lang="less" scoped>
.color-gradient1 {
    background: -webkit-linear-gradient(120deg, #ffd32b 30%, #bd44fe);
    background: linear-gradient(120deg, #ffd32b 30%, #bd44fe);
}
.color-gradient2 {
    background: -webkit-linear-gradient(120deg, #42b883 30%, #bd44fe);
    background: linear-gradient(120deg, #42b883 30%, #bd44fe);
}
.color-gradient3 {
    background: -webkit-linear-gradient(120deg, #42b883 30%, #bd44fe);
    background: linear-gradient(120deg, #42b883 30%, #bd44fe);
}
.color-gradient4 {
    background: -webkit-linear-gradient(120deg, #00dc82 20%, #ffe165, #bd44fe);
    background: linear-gradient(120deg, #00dc82 20%, #ffe165, #bd44fe);
}
.color-gradient5 {
    background: -webkit-linear-gradient(120deg, #38bdf8 30%, #bd44fe);
    background: linear-gradient(120deg, #38bdf8 30%, #bd44fe);
}
.color-gradient6 {
    background: -webkit-linear-gradient(120deg, #4d4d4d 30%, #bd44fe);
    background: linear-gradient(120deg, #4d4d4d 30%, #bd44fe);
}
.color-gradient7 {
    background: -webkit-linear-gradient(120deg, #41b883 30%, #bd44fe);
    background: linear-gradient(120deg, #41b883 30%, #bd44fe);
}
.color-gradient8 {
    background: -webkit-linear-gradient(120deg, #6380fb 30%, #bd44fe);
    background: linear-gradient(120deg, #6380fb 30%, #bd44fe);
}

/**首页网址推荐**/
.ui-home {
    width: 100%;
    margin: 20px auto;
    .ui-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-size: 26px;
    }
    .ui-project {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
        justify-content: space-between;
        margin-top: 20px;
        .item,
        .link {
            height: 180px;
        }
        .item {
            padding: 0;
            .link {
                text-decoration: none;
                display: block;
                color: #333;
                background: #fff;
                border: none;
                border-radius: 6px;
                transition: all 0.4s;
            }
            .link:hover {
                // -webkit-filter: brightness(1.2);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                transform: rotateY(-0.1deg) scale(1.03) translateZ(0);
            }
            .title {
                margin: 0;
                height: 80px;
                padding-top: 25px;
                font-size: 24px;
                color: #fff;
                text-align: center;
                border-radius: 6px 6px 0 0;
            }
            .desc {
                line-height: 2;
                padding: 0 12px;
                margin-top: 14px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
