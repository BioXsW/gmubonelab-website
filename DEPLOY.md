# 🚀 部署清单 · GMU Bone Lab

> 目标：把这个网站部署到 `https://www.gmubonelab.org`，零运维、免费托管、自动 HTTPS。  
> 方案：**Cloudflare Pages**（托管 + CDN + SSL）+ **Cloudflare Registrar**（域名 + DNS）

> 💡 **域名说明**：原本计划用 `.com` 但已被代理公司持有（开价 880/年，明显割韭菜），改用 `.org` 更适合学术机构（IEEE.org / ACM.org / NIH.org 等同款）。

---

## ✅ 总览：你需要做什么 vs 自动完成

| # | 步骤 | 谁做 | 预计时间 | 费用 |
|---|---|---|---|---|
| 1 | 注册 GitHub 账号（如果没有） | **你** | 3 分钟 | 免费 |
| 2 | 创建 GitHub 仓库并 push 代码 | **你**（按下方命令复制粘贴） | 3 分钟 | 免费 |
| 3 | 注册 Cloudflare 账号 | **你** | 2 分钟 | 免费 |
| 4 | 在 Cloudflare Registrar 购买 `gmubonelab.org` | **你** | 5 分钟 | **~$10/年** |
| 5 | 创建 Cloudflare Pages 项目 + 关联 GitHub | **你**（点 4 个按钮） | 3 分钟 | 免费 |
| 6 | 绑定 `www.gmubonelab.org` 自定义域 | **你**（点 2 个按钮） | 2 分钟 | 免费 |
| 7 | 等待 SSL 证书签发 + DNS 生效 | 自动 | 5–30 分钟 | — |

**总计：约 20 分钟操作 + 大约 75 元人民币（域名年费，唯一花钱的地方）**

---

## 步骤 1 —— 注册 GitHub 账号 _（如已有可跳过）_

1. 访问 https://github.com/signup
2. 用邮箱注册，验证邮箱
3. 记住你的用户名（下面用 `<YOUR_GITHUB>` 表示）

---

## 步骤 2 —— 把代码推到 GitHub

### 2.1 在 GitHub 网页端创建空仓库

1. 访问 https://github.com/new
2. **Repository name**: `gmubonelab-website`
3. **Public**（公开）—— Cloudflare Pages 免费版需要公开仓库
4. **不要勾选** "Add a README"、"Add .gitignore"、"Choose a license" —— 我们已经有了
5. 点击 **Create repository**

### 2.2 在你电脑的终端执行下面命令

> 打开 macOS 的 **终端**（Terminal）应用，逐行复制粘贴运行。

```bash
# 1) 进入网站目录
cd "/Users/bimmersw/Claude_Cowork/WEBSITE"

# 2) 初始化 git（第一次部署）
git init
git branch -M main

# 3) 配置 git 身份（只需配一次，把名字邮箱换成你的）
git config user.name "Your Name"
git config user.email "you@example.com"

# 4) 把所有文件加入 git 并第一次提交
git add .
git commit -m "Initial commit: GMU Bone Lab website"

# 5) 关联到刚才创建的 GitHub 仓库（把 <YOUR_GITHUB> 换成你的用户名）
git remote add origin https://github.com/<YOUR_GITHUB>/gmubonelab-website.git

# 6) 推送
git push -u origin main
```

> 第一次 push 会让你登录 GitHub。推荐用 **GitHub CLI**（`brew install gh && gh auth login`）或者 **Personal Access Token**（在 GitHub Settings → Developer settings → Tokens 里生成，作为密码使用）。

✅ 完成后你应该能在 `https://github.com/<YOUR_GITHUB>/gmubonelab-website` 看到所有文件。

---

## 步骤 3 —— 注册 Cloudflare 账号

1. 访问 https://dash.cloudflare.com/sign-up
2. 用邮箱注册，验证邮箱
3. 登录后会进入 Dashboard

---

## 步骤 4 —— 购买域名 `gmubonelab.org`

> Cloudflare Registrar 是**成本价**销售（无 markup），首年和续费同价 ~$10，这是 .org 全网最便宜的渠道之一。

1. 在 Cloudflare Dashboard 左侧菜单点 **Domain Registration → Register Domains**
2. 搜索框输入 `gmubonelab.org`
3. 显示 ~$10/year，点击 **Purchase**
4. 填写 Registrant 信息（**用真实信息**，可用学校通讯地址；ICANN 要求）
5. 添加支付方式（国际信用卡：Visa / Mastercard / Amex）
6. 完成支付

> ⚠️ **付完款后 14 天内**：你会收到一封 ICANN 验证邮件，标题类似 "Immediate Verification Required"。**必须点击邮件里的链接验证**，否则域名会被暂停解析。邮件可能进垃圾箱，记得检查。

✅ 完成后域名会自动出现在 Cloudflare Dashboard，DNS 也会自动接管 —— 不需要你改 nameserver。

---

## 步骤 5 —— 创建 Cloudflare Pages 项目

1. 在 Cloudflare Dashboard 左侧菜单点 **Workers & Pages → Create → Pages → Connect to Git**
2. 第一次会弹出授权 GitHub —— 点 **Authorize Cloudflare**，选择 `gmubonelab-website` 仓库（也可以选 "All repositories"）
3. 回到 Cloudflare 后，选择仓库 `gmubonelab-website`，点 **Begin setup**
4. 配置：
   - **Project name**: `gmubonelab` （会变成 `gmubonelab.pages.dev` 临时域名）
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: 留空（纯静态，不需要构建）
   - **Build output directory**: `/`（根目录）
5. 点 **Save and Deploy**
6. 大约 30 秒后部署完成，访问 `https://gmubonelab.pages.dev` 应该能看到网站

✅ 此时**网站已经在线了**，只是用临时域名。下一步绑定 www。

---

## 步骤 6 —— 绑定自定义域 `www.gmubonelab.org`

1. 在刚才的 Pages 项目页面，点上方 **Custom domains** 标签
2. 点 **Set up a custom domain**
3. 输入 `www.gmubonelab.org`，点 **Continue**
4. Cloudflare 会自动检测到域名在你账号下，提示 "We'll add a CNAME record for you" —— 点 **Activate domain**
5. **同样步骤再加一个** `gmubonelab.org`（裸域）
   - Cloudflare 会自动建立从裸域到 www 的跳转（结合我们的 `_redirects` 文件，确保所有访问都收敛到 www）

✅ DNS 会在几分钟内生效，SSL 证书自动签发（最长 30 分钟）。

---

## 步骤 7 —— 验证部署

完成后依次访问以下地址，应该都能打开：

- https://www.gmubonelab.org  ← 主域名
- https://gmubonelab.org      ← 自动跳转到 www
- 浏览器地址栏左边应该有 🔒 锁形图标（HTTPS 已生效）

如果 30 分钟后还是 "证书错误"：
- 在 Pages → Custom domains 看每个域名的状态，应该是 **Active**
- 在域名 → SSL/TLS → Edge Certificates，确认 "Universal SSL" 是 Active

---

## 🔄 后续如何更新网站

每次想改内容（比如新成员、新论文）：

```bash
cd "/Users/bimmersw/Claude_Cowork/WEBSITE"
# 修改 assets/js/i18n.js 或者其他文件
git add .
git commit -m "更新成员信息"
git push
```

Cloudflare Pages 会**自动检测 push 并在 60 秒内重新部署**。无需任何手动操作。

---

## 🆘 常见问题

**Q: 域名买不了 .org 怎么办？**  
A: `.net`（~$10）、`.info`（~$3 首年）也行。或者前面提到的 `gmu-bonelab.com` / `gzmubonelab.com`，把 README 和 i18n.js 里的域名相应替换即可。

**Q: 国内访问 Cloudflare Pages 慢吗？**  
A: 比 Vercel/Netlify 好很多，但比国内云慢。如果对国内速度有强需求，后期可以加 Cloudflare 的国内 CDN（需 ICP 备案）或者迁移到阿里云（也需备案）。

**Q: 不想公开仓库怎么办？**  
A: Cloudflare Pages 免费版要求公开仓库。把仓库设为 Private 需要付费 Workers Paid Plan（$5/月）。或者放到 GitLab（私有仓库免费）。

**Q: 怎么加 Google Analytics / 百度统计？**  
A: 在 `index.html` 的 `</head>` 之前粘贴对应的 tracking script 即可。

---

## 🎯 关键信息速查

- 仓库：`https://github.com/<YOUR_GITHUB>/gmubonelab-website`
- 临时域名：`https://gmubonelab.pages.dev`
- 正式域名：`https://www.gmubonelab.org`
- Cloudflare Dashboard：https://dash.cloudflare.com
- 域名续费提醒：Cloudflare 默认会自动续费，到期前邮件提醒
