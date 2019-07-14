<!--  这只是一份学习webpack的记录，版本4.0 -->

### 抽取公共代码优先级遵循以下顺序

- 基础库类代码，如 react+react-dom+react-redux+axios，升级频率不高，但每个文件都需要依赖

- 低频使用的组件，如富文本插件，城市级联，这些插件只在特定的页面使用

- 公用业务代码: 如 react 中 render 函数，webpack 默认会将其打包成一个独立的 bundle
