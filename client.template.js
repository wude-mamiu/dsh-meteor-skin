/**
 * Client half of 流星夜色.
 *
 * One wide wallpaper (1920x1080) covers the whole window: the user's square
 * picture sits sharp in the centre and its mirrored, blurred continuation fills
 * both sides, so there is no letterbox edge. The sidebar has no fill of its own,
 * and only a short bottom scrim keeps the composer readable.
 *
 * Generated from client.template.js — run scripts/build-client.mjs after edits.
 */
window.__ModuleLoader__.load({
  id: 'dsh-meteor-skin',
  factory(require) {
    const React = require('react');

    const BACKGROUND = '__BACKGROUND_DATA_URI__';

    const CSS = `
      html {
        background-color: #05080f;
        background-image: url("${BACKGROUND}");
        background-position: 50% 55%;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
      body {
        background: transparent !important;
        background-image: none !important;
      }
      /* short bottom scrim: the composer band covers the picture, nothing else */
      body::after {
        content: '';
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 150px;
        z-index: -1;
        pointer-events: none;
        background: linear-gradient(
          to top,
          rgba(4, 7, 14, 0.90) 0,
          rgba(4, 7, 14, 0.60) 64px,
          rgba(4, 7, 14, 0.22) 108px,
          rgba(4, 7, 14, 0) 150px
        );
      }
      #root {
        background: transparent !important;
      }
      /* sidebar / rail / any sidebar surface (including the expanded pop-out):
         no fill of its own, so it matches the wallpaper background exactly */
      [class*="sidebar" i],
      [class*="rail" i],
      [data-sidebar] {
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
        -webkit-backdrop-filter: none !important;
        backdrop-filter: none !important;
      }
      /* no vertical separators anywhere in the shell (the line at the sidebar edge) */
      #root * {
        border-left-color: transparent !important;
        border-right-color: transparent !important;
      }
      [class*="divider" i] {
        background: transparent !important;
        border: 0 !important;
      }
    `;

    // Frosted fills where the UI needs a surface; the sidebar has none at all.
    const TOKENS = {
      '--dsw-alias-bg-base': {
        light: 'rgba(6, 10, 20, 0.08)',
        dark: 'rgba(6, 10, 20, 0.08)',
      },
      '--dsw-alias-bg-layer-1': {
        light: 'rgba(8, 13, 26, 0.55)',
        dark: 'rgba(8, 13, 26, 0.55)',
      },
      '--dsw-alias-bg-layer-2': {
        light: 'rgba(8, 13, 26, 0.70)',
        dark: 'rgba(8, 13, 26, 0.70)',
      },
      '--dsw-alias-bg-overlay': {
        light: 'rgba(6, 10, 20, 0.97)',
        dark: 'rgba(6, 10, 20, 0.97)',
      },
      '--dsw-specific-sidebar-fill': {
        light: 'rgba(0, 0, 0, 0)',
        dark: 'rgba(0, 0, 0, 0)',
      },
      '--dsw-alias-border-l1': {
        light: 'rgba(160, 190, 255, 0.16)',
        dark: 'rgba(160, 190, 255, 0.16)',
      },
      '--dsw-alias-border-l2': {
        light: 'rgba(160, 190, 255, 0.24)',
        dark: 'rgba(160, 190, 255, 0.24)',
      },
      '--dsw-alias-brand-primary': { light: '#7FB6FF', dark: '#7FB6FF' },
      '--dsw-alias-label-primary': { light: '#E9F1FF', dark: '#E9F1FF' },
      '--dsw-alias-label-secondary': { light: '#A9B7D0', dark: '#A9B7D0' },
    };

    function MeteorSkin() {
      return React.createElement('style', { 'data-meteor-skin': '' }, CSS);
    }

    return {
      inject: ['slots', 'theme'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'meteor-skin',
          order: 1000,
        }, MeteorSkin));

        ctx.effect(() => {
          const release = ctx.theme.overrideTokens('dsh-meteor-skin', TOKENS);
          return () => release();
        }, 'meteor-skin: full-window picture, clean sidebar');
      },
    };
  },
});
