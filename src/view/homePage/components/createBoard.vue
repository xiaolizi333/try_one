<template>
  <el-dialog :model-value="modelValue" @close="closeDialog" width="500px" top="25%"
    style="border-radius: var(--el-border-radius-round);padding: 20px;">
    <template #header>
      <div class="header"><span>创建画板</span></div>
    </template>
    <template #default>
      <div></div>
    </template>
  </el-dialog>

</template>


<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])


const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  font-size: larger;
}
</style>
