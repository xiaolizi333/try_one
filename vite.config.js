import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 插件unplugin-icons引入element-ui中的图标(iconify 中自动导入,iconify集成了很多家开源图标)
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// 插件unplugin-auto-import自动引入属性，如下面的imports: ['vue']就意味自动加载reactive，ref等
import AutoImport from 'unplugin-auto-import/vite'
// 插件unplugin-vue-components自动按需引入element
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({}),],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon',   // 配置图标标签前缀，默认前缀是i(官网上的配置有问题，配到了AutoImport上是行不通的)
          enabledCollections: ['ep'],   // 自动下载图标文件，这里我只下了element-plus
        }),],
    }),
    Icons({
      autoInstall: true,
    })
  ],
  resolve: {
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // 代理
    proxy: {
      '/localhost': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localhost/, ""),
      }
    }
  }
})


