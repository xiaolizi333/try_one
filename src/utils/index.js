// 节流（从事件开始就开始计时，到时间就执行函数内容，就像2秒打印一个东西一样，一直触发事件一直延时打印）
export function throttled(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay);
    }
  }
}

//防抖（每次触发事件都会重新重置计时器，直到最后一次触发事件，计时器到时间后就执行函数内容，就像2秒打印一个东西一样，一直触发事件的话直到最后不触发后的2秒才会执行一次打印）
export function debounce(fn, delay = 2000) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


/**
 * 监听页面宽度变动后滚动条变化
 * @param {Element} targetEle 目标元素
 * @param {Element} referenceELe 参照元素
 * @param {number} masonryWidth 瀑布流一个小盒子的宽度
 * @param {String} behavior 平滑过度方式
 * @param {number} delay 延时时间
 * @returns {Function}  返回一个页面宽度大小变动监视器
 */
export const resizeChange = (targetEle, referenceELe, masonryWidth, behavior = 'instant', delay = 300) => {
  // 初始瀑布流列数
  let tilecolumns = Math.floor(targetEle.clientWidth / masonryWidth)
  const observer = new ResizeObserver(entries => {
    if (!targetEle || !referenceELe) {
      return
    }
    else {
      const target = entries[0].target
      const columns = Math.floor(target.clientWidth / masonryWidth)
      if (columns !== tilecolumns) {
        setTimeout(() => {
          // 重新滑动滚动条
          targetEle.scrollTo({
            top: Math.floor(referenceELe.offsetHeight / 3),
            behavior: behavior  // 平滑为smooth
          })
        }, delay);
      }
      tilecolumns = columns
    }
  });
  return observer
}
