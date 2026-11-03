# 流星夜色 · Meteor Night

A full-window meteor-night wallpaper skin for **DeepSeek Harness** (Desktop and `dsh web`).
整窗流星夜空壁纸皮肤，桌面端和 `dsh web` 通用。

[中文](#中文) · [English](#english)

---

## 中文

### 效果

- **整窗壁纸**：一张流星夜空图铺满整个窗口（`cover`），原图经 **Real-ESRGAN 4× 超分**后降采样到 2560，
  浏览器只做缩小，所以画面清晰、没有拉伸模糊。
- **侧边栏透明**：侧栏不再有自己的底色、边框和光晕，直接透出后面的壁纸。
- **夜间配色**：文字暖白 `#E9F1FF` / 次级 `#A9B7D0`，强调色星光蓝 `#7FB6FF`；弹层保持近实色保证可读。
- **输入区压暗**：窗口底部 150px 渐变遮罩，输入/发送时文字始终有安静的底色。
- **零外部请求**：壁纸内嵌在客户端 bundle 里，不走网络。

### 安装

在 DSH 里用插件市场搜索 **流星夜色**（上架后），或命令行：

```sh
# npm（发布后）
dsh plugin --profile <profile> add dsh-meteor-skin

# GitHub 源码（无需构建脚本，client.js 已提交）
dsh plugin --profile <profile> add github:wude-mamiu/dsh-meteor-skin
```

装完刷新页面即可；不需要额外构建。

### 自定义

| 想改什么 | 位置（`client.template.js`） |
|---|---|
| 取景位置 | `background-position: 50% 55%` |
| 底部压暗范围 | `body::after` 的 `height: 150px` 与渐变 |
| 对话区玻璃浓度 | token `--dsw-alias-bg-base` 的 `0.08` |
| 输入框/卡片浓度 | token `--dsw-alias-bg-layer-1/2` |
| 侧栏透明 | `[class*="sidebar"]` 规则 |

改完重建：

```sh
python scripts/make-sharp.py      # 可选：重新超分/锐化原图
node scripts/build-client.mjs     # 重新打包 client.js
```

### 素材与许可

- 代码：MIT，见 [LICENSE](LICENSE)。
- **壁纸素材由使用者提供**，版权归原作者所有；如果这张图不是可再分发的素材，
  请在公开仓库里替换 `assets/background.jpg` 并重新构建，或不要将图片纳入公开发布。
- 超分使用 [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)（BSD-3-Clause）在本地离线完成。

---

## English

### What it does

- **Full-window wallpaper**: a meteor-night illustration fills the whole window (`cover`).
  The source was upscaled 4× with **Real-ESRGAN**, downsampled to 2560, so the browser only
  ever downscales — the picture stays crisp instead of being stretched.
- **Transparent sidebar**: the sidebar has no fill, border or glow of its own; the artwork
  shows straight through.
- **Night-only ink**: warm white `#E9F1FF`, secondary `#A9B7D0`, accent `#7FB6FF`; overlays
  stay nearly opaque so their text remains readable.
- **Composer scrim**: a 150px gradient band at the bottom keeps the input area calm.
- **No network requests**: the wallpaper is embedded in the client bundle.

### Install

Market search for **Meteor Night** (after listing), or from a shell:

```sh
dsh plugin --profile <profile> add dsh-meteor-skin          # npm, after publish
dsh plugin --profile <profile> add github:wude-mamiu/dsh-meteor-skin
```

Refresh the page afterwards; there is no build step.

### Credits

- Code: MIT (see [LICENSE](LICENSE)).
- The wallpaper is user-supplied; its rights belong to the original author. Replace
  `assets/background.jpg` and rebuild if it cannot be redistributed.
- Upscaling was done locally with [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) (BSD-3-Clause).
