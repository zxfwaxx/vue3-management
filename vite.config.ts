import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
//按需导入 element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 按需导入icon组件
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const pathSrc = path.resolve(__dirname, './src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
     // css预处理器
    preprocessorOptions: {
      //define global scss variable
       // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
      // scss: {
      //   additionalData: `@import "@/assets/mixin.scss";`
      // }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        //按需导入icon组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    })
  ]
})
