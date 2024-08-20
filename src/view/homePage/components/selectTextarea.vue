<template>
  <div ref="divRef" class="select-textarea"
    :class="[state.isfocus ? 'focus' : '', state.fillHeight ? 'fillHeight' : '', props.disabled ? 'disabled' : '']">
    <textarea class="scrollbarNone" v-model="state.textValue" :disabled="props.disabled"
      :placeholder="props.placeholder" @click.prevent="keepStatus"></textarea>
    <el-popover v-model:visible="state.visible" :disabled="props.disabled" placement="top-start" :width="300"
      trigger="hover" :teleported="false">
      <template #reference>

        <transition name="el-fade-in-linear">
          <div class="reference pointer" v-show="props.disabled ? true : state.isShow">
            <span class="content">{{ state.selectValue }}</span>
          </div>
        </transition>

      </template>

      <template #default>
        <div v-if="props.options.length" class="el-options">
          <span class="option pointer" v-for="item in props.options" :key="item.key" @click="change(item)">{{
            item.value
          }}</span>
        </div>
        <div v-else style="text-align: center;">no data</div>

      </template>
    </el-popover>

  </div>

</template>

<script setup>
import { onBeforeMount, onUnmounted } from 'vue';


const divRef = ref()

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  selectValue: {
    type: String,
    default: '创作工具'
  },
  textValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: []
  }
})

const state = reactive({
  visible: false,
  textValue: '',
  selectValue: '',
  isfocus: false,
  fillHeight: false,
  isShow: false,
})

const change = (item) => {
  state.selectValue = item.label
  state.visible = false
  state.fillHeight = true
}


const keepStatus = (e) => {
  state.isfocus = true
}

onBeforeMount(() => {
  state.selectValue = props.selectValue
  if (props.disabled) {
    state.selectValue = props.selectValue
  }
})

const divRefBlur = (e) => {
  console.log('e:', e)
  if (!(divRef.value === e.target || divRef.value?.contains(e.target))) {
    state.isfocus = false
    if (state.selectValue === '创作工具') {
      state.isShow = false
      state.fillHeight = false
    } else {
      state.isShow = true
      state.fillHeight = true
    }
  } else {
    state.isShow = true
    state.fillHeight = true
  }
}

onMounted(() => {
  document.addEventListener('click', divRefBlur)
})

onUnmounted(() => {
  document.removeEventListener('click', divRefBlur)
})


</script>

<style lang="less" scoped>
.select-textarea {
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  padding: 2px;
  height: 36px;
  transition-duration: var(--el-transition-duration);
  transition-timing-function: ease-in-out;

  textarea {
    height: 36px;
    border-radius: var(--el-border-radius-big);
    box-shadow: none;

    &:hover,
    &:focus {
      box-shadow: none;
    }
  }

  .reference {
    padding: 0 8px;
    height: 32px;
    width: fit-content;

    .content {
      display: flex;
      align-items: center;
      font-weight: 500;

      &::after {
        content: '';
        display: inline-block;
        margin-left: 8px;
        border-top: 4px solid var(--el-color-info-light-3);
        border-right: 4px solid transparent;
        border-bottom: 0;
        border-left: 4px solid transparent;
        transition-duration: 0.5s;
      }

      &:hover {
        &::after {
          transform: rotate(180deg);
        }
      }
    }
  }

  :deep(.el-popover) {
    border-radius: var(--el-border-radius-big);

    .el-options {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: var(--el--border--radius--big);

      .option {
        display: inline-block;
        height: 34px;
        line-height: 32px;
        padding: 0 12px;
        border-radius: var(--el-border-radius-big);

        &:hover {
          background-color: var(--el-bg-color-page);
        }
      }
    }
  }

  // el-select开始获得焦点
  &.focus {
    box-shadow: 0 0 0 1px var(--el-color-danger-dark) inset;
  }

  // 提升高度
  &.fillHeight {
    height: 100px;

    textarea {
      height: calc(100% - 36px);
    }
  }

  &:hover {
    box-shadow: 0 0 0 1px var(--el-color-danger-dark) inset;
  }

  &.disabled {
    height: 100px;
    pointer-events: none;
    background-color: rgba(250, 250, 250);

    textarea {
      height: calc(100% - 36px);
    }
  }
}
</style>