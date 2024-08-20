* 预览用快捷键:shift + crtl + v

## md规范

  1. 代码模块要与上一段空一行
  2. 代码模块要与上一段缩进距离`四个缩进`，但要是用三引号，如`` ```javascript ``这种就空`两个缩进`就行，下面有例子
  3. 为父子元素时，子元素要与父元素空`两个缩进`(无论是块引用还是有序或无须列表等等，都要空`两个缩进`)
  4. 用``[这里为包裹住的单词或短语]``反引号可以包裹单词或短语，当成代码块展示(单反引、双反引跟三反引都可以，但三反引可以包裹多行数据，看第5点)
  5. 三个反引号后面可以加对应语言，这样可以给代码块添加相应语言的代码高亮，如`` ```javascript [这里展示真正的代码] ``` ``，

[vue](https://cn.vuejs.org/guide/introduction.html)

1. v-model默认绑定的是`modelValue`

2. v-for与v-if不要写在同一个组件上，如:

    ```javascript
    <template>
      <el-text v-for="item in textList" :key="item.text" v-if="textList.isShow"></el-text>
    </template>
    ```

    **上面写法是错的，参照下面写法(或者将v-for和v-if置于父子组件中，但有时候真拆不了，例子可看login.vue中的showFormItem)**

    ```javascript
    <template>
      <el-text v-for="item in showTextList" :key="item.text"></el-text>
    </template>
    <script setup>
      const showTextList = computed(() => {
        return textList.filter(item => {
          return item.isShow
        })
      })
    </script>
    ```

## [vite](https://cn.vitejs.dev/guide/)

1. 强制刷新：scripts里面键值对的值里加--force：如：

    ```json
    "scripts": {
      "dev": "vite --force",  // 这就是强制刷新，否则有时候改源码调试会不生效
      "build": "vite build",
      "preview": "vite preview"
    },
    ```

## [element-plus](https://element-plus.org/zh-CN/component/overview.html)

1. el-form组件用`ref`获取元素的时候不要取名为`elForm`!!!

    ```javascript
      <template>
        <el-form ref="elFrom"></el-form>
      </template>
      <script setup>
        const elFrom = ref()
      </script>
    ```

    **上面这段代码(x)**

2. 在el-dialog中回显问题，直接用下面代码就行(`props`还是不要直接改，还是得`emit`)

    1. 子组件(dialogCompont)：

        ```javascript
        <template>
          <el-dialog :model-value="modelValue" :close="closeDialog"></el-dialog>
        </template>

        <script setup>
          defineProps(['modelValue'])
          const emit = defineEmits(['update:modelValue'])
          const closeDialog = () => {
            emit('update:modelValue', false)
          }
        </script>
        ```

    2. 父组件：

        ```javascript
        <template>
          <dialog-compont v-model=state.dialogVisible></dialog-compont>
          <el-button @click="() => {state.dialogVisible = true}"></el-button>
        </template>

        <script setup>
          const state = reactive({
            dialogVisible: false
          })
        </script>
        ```

## [vue-masonry](https://masonry.desandro.com/options "vue的瀑布流组件")

1. 设置`fit-width`自适应屏幕宽度变化(style里面也得设置margin: 0 auto)；

    ```javascript
    <div v-masonry class="masonry-page" :gutter="store.gutter" :fit-width="store.fitWidth" column-width=".photo-card" item-selector=".photo-card">
      <el-image v-masonry-tile class="photo-card mb-20" v-for="item in props.photoArray" :key="item.pinId" :src="item.src"></el-image>
    </div>
    ```
