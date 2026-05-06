# GMU Bone Lab Website
> 贵州医科大学骨科医工融合与临床转化实验室门户网站  
> Static site · 中英双语 · 部署在 Cloudflare Pages

---

## 📁 目录结构

```
WEBSITE/
├── index.html              主页面（单页滚动）
├── 404.html                404 页面
├── robots.txt              SEO
├── sitemap.xml             SEO
├── _headers                Cloudflare Pages 安全头
├── _redirects              根域 → www 跳转
├── .gitignore
├── DEPLOY.md               ⭐ 完整部署清单（你需要看这个）
└── assets/
    └── js/
        ├── i18n.js         ⭐ 中英文文案在这里改
        └── main.js         交互逻辑（语言切换 / 表单等）
```

## ✏️ 修改实验室内容

打开 `assets/js/i18n.js`，里面有 `zh` 和 `en` 两个对象，对应中英文。每条字符串都有相同的 key，改字面值即可。HTML 文件不需要动。

## 🚀 部署

完整步骤见 **[DEPLOY.md](./DEPLOY.md)** —— 里面有手动操作清单（域名购买、Cloudflare 账号、GitHub 关联等）。

## 🛠️ 本地预览

```bash
cd WEBSITE
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 📜 License

© 2026 贵州医科大学骨科医工融合与临床转化实验室 · All rights reserved.
