## dnspod 自动更新解析脚本

### 使用
- 修改config.js

>在 https://www.dnspod.cn/console/user/security 创建api token 并填入config.js 

- 运行
```bash
node main.js

#or
npm run ddns
```
>过程中会帮助你获取domainId 和 recordId 暂时只能手动填入config.js,
填好配置后再次运行即可
### 关于获取公网IP
> 建议自己修改获取本机公网ip地址部分，因为我自己起的服务可能果断时间会关闭。

### 第一次用github🤣
