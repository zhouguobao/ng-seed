# Angularjs 项目规范
### 基本说明：
> 项目根目录为webapp 文件夹，开发阶段使用webpack-dev-server/node/nginx作为本地服务，线上使用Nginx。接口服务需做反向代理，以解决跨域问题。html文件引用静态资源（js，css，img）时，必须使用CDN绝对路径。
> 文件版本号：框架、类库、第三方插件等需在引用路径中体现版本号，业务代码发布上线时使用文件名+MD5形式。
> 参考：https://github.com/jm-team/ng-seed


## 一、目录规范
### 1.一级目录
```
dist:  (包含项目构建后的代码)
config: 环境配置文件
node_modules:  (包含服务依赖模块、gulpfile、webpack依赖模块)
src:  (包含源码文件)
test:  (测试文件, 子目录应该和src目录相对应)(暂无测试)
package.json:  (运行、构建项目依赖的模块列表)
webpack.config.js:  (webpack 基础配置文件)
webpack-dev.js : webpack开发环境
webpack-production.js: webpack 生成环境
```




### 2.src二级目录
```
css:  (包含样式文件)
dep:  (包含第三方文件 如：angularjs、ui-router...)
entry:  (包含项目主文件)
font:  (包含字体)
img:  (包含图片)
js:  (包含js文件 里面分controller、directive、service、filter、app.js)
page: (项目模板文件)
```



### 3.js文件夹目录
```
controller:  (包含angular项目自定义控制器文件)
directive:  (包含angular项目自定义指令文件)
filter:  (包含angular项目自定义过滤器文件)
service:  (包含angular项目自定义服务文件)
app.js:  (angular 项目配置启动文件)
entry.js: (webpack 入口文件)
```

### 4.page 文件夹 路由对应文件夹

## 二、第三方库和服务

### 1.Js: 
1. angualrjs(https://angularjs.org/) v1.2.29
2. ui-router(http://angular-ui.github.io/ui-router/site/#/api/ui.router) v0.2.10
3. ngResource(https://docs.angularjs.org/api/ngResource/service/$resource) v1.2.29
4. bindOnce(https://github.com/Pasvaz/bindonce) v0.3.3
5. ui-bootstrap(https://angular-ui.github.io/bootstrap/)v0.12.0

### 2.Css: bootstrap(ui-bootstrap 依赖)
### 3.打包构建工具：webpack
### 4.测试： krama, jasmine
### 5.SEO:  prerender.io

##三、Angular代码规范及建议
### 1.Controller
1. Controller 中不应该出现dom操作 dom 操作应该在directive中出现
2. Controller 中不应该出现$http.get()、$ngResource这些类似的代码 这些应该放在service中当作服务 然后再controller 中调用这些服务
3. 尽可能的精简您的controller 避免controller 臃肿
4. 控制器异步加载

### 2.Service
1. service一般用于controller 之间的数据交互、请求服务端的数据、编写公用方法

### 3.Filter
1. filter用于数据的格式化 可在html模板中直接使用或在controller中调用filter 方法
2. Filter 应尽量在controller中使用 防止不稳定的过滤器导致程序出错

### 4.Directive
1. directive 用于扩展HTML 使自己定义的HTML具有交互性
2. Directive 一般用属性指令 元素指令在IE低版本浏览器要额外创建这个指令元素
3. 指令中当元素被移除后 要同步删除这个指令的作用域 $destroy
4. ng-repeat指令使用 track by  
5. Track by参考：http://www.codelord.net/2014/04/15/improving-ng-repeat-performance-with-track-by

### 5.性能优化
1. 在数据不需要双向绑定的地方使用单向绑定 以减少watch 数 (使用 bindOnce这个库)
2. 按需加载数据 如： 鼠标滚动加载、分页加载
3. 对于一些字典类的数据 可以存放在service或在支持localstroage中应放在这些地方 避免多次加载相同数据 (如省市区这些大而且基本不会更改的数据)
4. 在路由状态跳转后对上一个路由中还在请求的XHR 要取消这些请求 防止跳转频率过大导致请求阻塞
5. 如果可以使用ng-if 替代ng-show
6. 异步加载控制器
7. 使用ng-show 显示隐藏搜索时的列表 避免频繁创建删除 如在输入框过滤本地数据的时候
8. 尽可能不使用ng-mousemove、ng-mouseenter、ng-mouseleave...这些高频率触发的事件 或使用定时器定时触发
### 6.与服务端间的交互（注意）
1. Angular 在post请求数据的时候传递的参数是通过body体传送的 因此后端那边接收数据的时候需要注意
2. 数据请求使用restful 规范， 使用angular ngResource 模块
3. Restful详细参考地址http://www.ruanyifeng.com/blog/2014/05/restful_api.html
4. ngResource使用参考地址：http://www.cnblogs.com/liulangmao/p/3906721.html

### 7.其他注意事项
1. 全局监听事件放在 angular启动模块的run方法中因为run 方法在整个angular项目的生命周期中只 执行一次
2. 利用拦截器对某一类请求状态做统一处理 如401 需要登录 则跳转到登陆页面
3. 所有的依赖注入需要显示声明 防止依赖压缩找不到 
如：app.controller(‘xxCtrl’, [‘$scope’, ‘serivce’, function($scope, service){}])
4. 顶级作用域($rootScope) 尽量不要挂载属性或方法，使用服务(Service)去解决
5. 大的数据列表注意性能

## 四、图片规范
1. 小的背景图片做css sprite
2. 图片做md5防止图片改动缓存问题
3. 根据需求做图片base64位

## 五、CSS样式表
1. 减少样选择器层级
2. 合并压缩CSS样式表
3. 添加md5 防止样式改变缓存问题
4. 尽可能不要用通配选择符
5. 对z-index属性赋予合理的值 防止前面赋值太大 导致后面覆盖前面越来越大
6. 组件类的CSS 一般带上前缀以便后面的取名复用

## 六、Html
1. 合并压缩html
2. 尽量减少DOM嵌套层级
3. 不使用废弃标签
4. 不写行内样式 遵循结构、表现、行为三者分离
5. Html要有语义化

## 七、文件命名和代码风格
1. Controller文件夹中的文件名称应是相对应模版名称 + ctrl
2. 文件名有多个单词使用驼峰式
3. JS 代码中应使用匈牙利命名法
4. 参考百度：https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md

## 八、浏览器兼容性要求
1. 兼容所有主流标准浏览器，IE8及以上IE浏览器。
2. 不支持H5，css3交互的浏览器，需使用js进行兼容。
3. 小于ie8浏览器访问需提示用户升级浏览器。Body顶部添加如下代码，样式可根据网站具体ui进行调整：

```html
<!--[if lt IE 8]>
<p class="browsehappy">
    你正在使用一个<strong>过时</strong>的浏览器。请<a class="link" target="_blank" href="http://browsehappy.com">升级你的浏览器</a>以查看此页面。
</p>
<![endif]-->
```


## 九、浏览器分辨率适配要求
1. 前台网站一般页面内容固定宽度1190分辨率（电商平台、物流平台）。
2. 前台网站满屏设计内容需要考虑1920*1080至1024*768分辨率下的适配效果（官网、三馆）。
3. 后台管理网站需采用流式布局，最小宽度适配至1280分辨率。