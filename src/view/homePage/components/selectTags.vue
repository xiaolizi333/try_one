<template>
  <div class="el-select-parent" :class="[state.isfocus ? 'focus' : '']" >

    <el-select-v2 ref="selecV2" class="el-textarea scrollbarNone mb-8" v-model="state.selectValue" multiple filterable
      allow-create default-first-option :reserve-keyword="false" :options="props.options" placeholder="添加标签"
      placement="top-start" @focus="focus" @blur="blur">
    </el-select-v2>

    <div class="usage-tags" v-if="props.options.length">
      <span class="mr-8">常用：</span>
      <el-tag type="danger" class="mr-8 pointer" v-for="item in props.options.slice(0, 3)" :key="item.value"
        @click="pushTags(item)">{{ item.label }}</el-tag>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  options: {
    type: Array,
    default: []
  }
})

const selecV2 = ref()

const state = reactive({
  selectValue: [],
  isfocus: false
})


const focus = () => {
  state.isfocus = true
}

const blur = () => {
  state.isfocus = false
}

const pushTags = (item) => {
  if (!state.selectValue.includes(item.value)) {
    // 源码里面的选中节点方法，option例：{label: 'example',value: 'example', created: true, disabled: false}
    selecV2.value.onSelect({
      label: item.label,
      value: item.value
    })
  }
}

const reset = () => {
  state.selectValue = []
}

defineExpose({
  reset
})


</script>

<style lang="less" scoped>
.el-select-parent {
  padding: 4px 2px 8px;
  height: 144px;
  border-radius: var(--el-border-radius-big);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  transition-duration: var(--el-transition-duration);

  &.focus {
    box-shadow: 0 0 0 1px var(--el-color-danger-dark) inset;
  }

  &:hover {
    box-shadow: 0 0 0 1px var(--el-color-danger-dark) inset;
  }

  .el-textarea {
    height: calc(100% - 32px);

    :deep(.el-select__wrapper) {
      height: 100%;
      min-height: 80px;
      overflow: auto;
      border: none;
      border-radius: var(--el-border-radius-big);
      box-shadow: none;
      align-items: baseline;

      &:hover,
      &.is-focused {
        box-shadow: none;
      }

      .el-select__selection {
        margin: 0;
      }

      &::-webkit-scrollbar{
        display: none;
      }
    }
  }

  .usage-tags {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: var(--el-color-info-light-3);
    font-size: smaller;

    .tags {
      color: var(--el-color-danger);
    }
  }
}
</style>