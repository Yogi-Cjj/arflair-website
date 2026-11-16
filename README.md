# ArFlair GitHub Pages 部署说明

1. 解压 ZIP，把里面的文件和文件夹原样提交到 GitHub 仓库根目录（包括 .nojekyll）。建议用 Git 推送，保留目录结构。
2. Settings → Pages → Build and deployment → Deploy from a branch，选择 main 和 / (root)。
3. 包内 CNAME 已指定 www.arflairresin.com。准备对外上线时，在 Pages 的 Custom domain 核对该域名，按 GitHub 提示为 www 配置 DNS CNAME，目标是你的 GitHub Pages 主机名（通常是 <账号>.github.io，不加仓库路径）。保留 MX 和邮箱相关 TXT 记录。域名验证通过后启用 Enforce HTTPS。
4. 用无痕窗口打开 https://www.arflairresin.com/、商品页和 quote.html。测试报价表单能生成英文 WhatsApp 草稿，并核对收件号码。表单在浏览器生成草稿，访客需要在 WhatsApp 自行发送。
5. 正式网址可匿名访问后，把 https://www.arflairresin.com/sitemap.xml 提交到 Google Search Console。

如果要先使用 github.io 地址预览，请暂不提交 CNAME；正式切换时再恢复。SEO 配置已按正式 www 域名生成。此包不含 Sites 登录门槛或托管凭证。
