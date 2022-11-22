[仓库](https://gitee.com/lagoufed/fed-e-002/tree/master/)


系统学习大前端(1)---函数式编程、异步编程【OK】
https://blog.csdn.net/guo187/article/details/107052461

系统学习大前端(2)---手写promise【OK】
https://blog.csdn.net/guo187/article/details/107338887

系统学习大前端(3)---函数式编程、异步编程练习【OK】
https://blog.csdn.net/guo187/article/details/107339112

系统学习大前端(4)---ES6+新特性、TS、JS性能优化【OK】
https://blog.csdn.net/guo187/article/details/107052501

系统学习大前端(5)---ES6+新特性、TS、JS性能优化练习【OK】
https://blog.csdn.net/guo187/article/details/107341237


系统学习大前端(6)---工程化、自动化构建 【OK】
https://blog.csdn.net/guo187/article/details/107341913 


系统学习大前端(7)---工程化、自动化构建练习 【OK】
https://blog.csdn.net/guo187/article/details/107342760


系统学习大前端(8)---模块化、webpack、rollup、规范化标准 
https://blog.csdn.net/guo187/article/details/107353831 
系统学习大前端(9)---模块化、webpack、rollup、规范化标准练习 
https://blog.csdn.net/guo187/article/details/107354947 


系统学习大前端(10)---vue-router实现、模拟vue、VDOM实现原理 
https://blog.csdn.net/guo187/article/details/107356837  


系统学习大前端(11)---vue-router实现、模拟vue、VDOM实现原理练习
https://blog.csdn.net/guo187/article/details/107363664 







### git 提交规范
[commitlint](https://commitlint.js.org/#/guides-local-setup)
commitlint是一个提交验证工具。原理是可以在实际的 git commit 提交到远程仓库之前使用 git 钩子来验证信息。提交不符合规则的信息将会被阻止提交到远程仓库。

```
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```
接着在 package.json 中配置 commitlint 脚本:
```
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
```
单独对 commitlint 进行配置的话，需要建立校验文件 commitlint.config.js，不然会校验失败

husky 是一个增强的 git hook 工具。可以在 git hook 的各个阶段执行我们在 package.json 中配置好的 npm script。
```
npm install --save-dev husky
```
接着在 package.json 中配置 commitmsg 脚本:
```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
 },
 ```



###  gitmoji
```
npm i -g gitmoji-cli
```

```
git commit -m ':bug: 问题fix'
```

[gitmoji项目地址](https://github.com/carloscuesta/gitmoji/)
[gitmoji使用示例](https://gitmoji.carloscuesta.me/)    


### typeshuo
```
    feat: [:sparkles:]新增feature  
    fix: [:bug:]修复bug
    docs: [:pencil:] 仅仅修改了文档，如readme.md   
    style: [:lipstick:]仅仅是对格式进行修改，如逗号、缩进、空格等。不改变代码逻辑。
    refactor: [:recycle:]代码重构，没有新增功能或修复bug
    perf: [:zap:]优化相关，如提升性能、用户体验等。
    test: [:white_check_mark:]测试用例，包括单元测试、集成测试。
    chore: [:wrench:]改变构建流程、或者增加依赖库、工具等。
    revert: [:rewind:]版本回滚
    build:[:heavy_plus_sign:]构建系统或者包依赖更新（eg: gulp、npm、broccoli） [:heavy_minus_sign:] - 移除依赖
    ci: [:construction_worker:]CL配置，脚本文件等更新（eg：Travis持续集成服务）
    improvement: []对现有功能的改进
```

```
[:wastebasket:]              清理不良代码
[:dizzy:]                    添加动画和过渡
[:goal_net:]                 错误捕捉
[:triangular_flag_on_post:]  添加更新移除功能
[:seedling:]                 添加更新种子文件
[:label:]                    添加更新类型（流，类型脚本）
[:mag:] 改进SEO
[:alembic:] 尝试新事物
[:camera_flash:]  添加或更新快照
[:see_no_evil:]   添加或更新.gitignore文件
[:iphone:]     响应式设计
[:building_construction:] 改变架构
[:children_crossing:]  提升用户体验
[:mute:]   移除日志
[:loud_sound:] 添加日志
[:speech_balloon:] 更新文本和文字
[:bulb:] 源代码
[:wheelchair:] 改善无障碍环境
[:beers:]   不明确含义写代码
[:ok_hand:] 由于codereview 更改代码
[:bento:] 添加更新资源
[:boom:] 引入突破性变化
[:page_facing_up:] 添加更新许可证
[:truck:] 移动重命名文件
[:alien:] 由于API改变而更新代码
[:package:] 更新编译文件或包
[:twisted_rightwards_arrows:]  合并分支
[:rewind:] 回滚
[:poop:]  编写需要改进的槽糕代码
[:pencil2:] 修正文字错误
[:globe_with_meridians:] 国际化和本地化
[:wrench:] 更改配置文件
[:heavy_minus_sign:] 删除依赖
[:heavy_plus_sign:] 添加依赖
[:whale:] docker
[:recycle:] 重构代码
[:chart_with_upwards_trend:] 添加分析或跟踪代码
[:construction_worker:] 添加配置项构建系统
[:pushpin:] 依赖固定版本
[:arrow_up:] 升级依赖
[:arrow_down:] 降级依赖
[:green_heart:]  修复ci构建
[:construction:] 进行中工作
[:rotating_light:] 移除警告
[:bookmark:] tag
[:lock:]  修复安全问题
[:white_check_mark:] 更新测试
[:tada:] 初始化提交
[:lipstick:] 更新UI或样式
[:rocket:] 部署
[:pencil:] 文档
[:sparkles:] 新功能
[:ambulance:] hotfix
[:bug:] bug
[:fire:] 移除文件或代码
[:zap:] 提高性能
[:art:] 改进代码格式或结构

```


