<template>
  <el-input class="navigator-input ml-12" v-model="state.inputValue" placeholder="大家都在搜：红蓝配色" @input="searchInputValue"
    clearable>
    <template #prefix>
      <el-icon>
        <icon-ep-search />
      </el-icon>
    </template>
    <template v-if="state.inputValue" #suffix>
      <el-button class="ep-search" round color="#ff5967"><icon-ep-search /></el-button>
    </template>
  </el-input>
</template>

<script setup>

import { debounce } from '@/utils/index.js'

const emit = defineEmits(['updateInputValue'])

const state = reactive({
  inputValue: ''
})

const searchInputValue = debounce(() => {
  emit('updateInputValue')
}, 1000)

</script>


<style lang="less" scoped>
.navigator-input {

  &:focus {
    border: 10px solid yellow;
  }

  :deep(.el-input__wrapper) {
    min-width: 500px;
    height: 38px;
    color: #1e202373;
    font-size: 16px;
    background-color: var(--el-fill-color-light);
    border: 0;
    border-radius: var(--el-border-radius-round);
    /* 虽然这里box-shadow没有在这定义,但el-input自带了这个属性值,也是可以用在这的*/
    transition-property: background-color, box-shadow;
    transition-duration: var(--el-transition-duration-default);

    &:hover {
      background-color: #fff;
      transition-property: background-color, box-shadow;
      transition-duration: var(--el-transition-duration-default);
    }


    &.is-focus {
      box-shadow: 0 0 0 1px var(--el-color-error-light-5) inset;
      background-color: #fff;
    }

    ::placeholder {
      padding-left: 8px;
      font-size: 16px;
      color: #1e202373;
    }

    /* 将clear清除按钮与搜索按钮调换顺序，让清除按钮在左边*/
    .el-input__suffix-inner {
      flex-direction: row-reverse;

      .el-input__clear {
        padding-right: 8px;
        font-size: 16px;
        border-right: 1px solid var(--el-border-color-dark);
      }

      .ep-search {
        color: #fff;
      }
    }

  }

}
</style>