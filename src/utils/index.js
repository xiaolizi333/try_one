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
export function debounce(fn, delay) {
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