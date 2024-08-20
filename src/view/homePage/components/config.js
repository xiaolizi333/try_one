export const navigatorName = {
  // focus: 'focus',
  discovery: 'discovery',
  source: 'source',
  formwork: 'formwork',
  AITools: 'AITools',
  contest: 'contest'
}


export const navigatorClaasify = {
  // [navigatorName.focus]: { name: navigatorName.focus, label: '关注', type: 'page', component: 'null' },
  [navigatorName.discovery]: { name: navigatorName.discovery, label: '发现', type: 'page', component: 'null', target: '_self' },
  [navigatorName.source]: { name: navigatorName.source, label: '素材', type: 'page', component: 'null', target: '_self' },
  [navigatorName.formwork]: { name: navigatorName.formwork, label: '模板', type: 'link', address: 'https://gd.huaban.com/templates', target: '_blank' },
  [navigatorName.AITools]: { name: navigatorName.AITools, label: 'AI工具', type: 'link', address: 'https://gd.huaban.com/create-design', target: '_blank' },
  [navigatorName.contest]: { name: navigatorName.contest, label: '大赛', type: 'page', component: 'null', target: '_self' },
}


export const circleFilledConfig = [
  { label: '上传采集', key: 'uploadCollection', iconClass: 'icon-upload-collection', visibleName: 'uploadCollectionVisible' },
  { label: '创建画板', key: 'createArtboard', iconClass: 'icon-artboard', visibleName: 'createBoardVisible' },
  { label: '去桌面端上传', key: 'desktopUpload', iconClass: 'icon-desktop-upload', link: 'https://www.gaoding.com/pro?hmsr=hbld-hbld-pro-hbld-tuwen-huaban-bdqd&utm_medium=hb&utm_source=hbld', target: '_blank' },
  { label: '浏览器插件', key: 'browserPlugin', iconClass: 'icon-plugin', link: 'https://huaban.com/about/goodies', target: '_blank' },
  { label: '源文件导入/在线设计', key: 'importDesign', iconClass: 'icon-import-design', link: 'https://gd.huaban.com/create-design?action=open_local', target: '_blank' },
]
