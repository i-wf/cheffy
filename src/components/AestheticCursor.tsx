import { useEffect } from 'react';
import { useCustomization } from '../context/CustomizationContext';

export function AestheticCursor() {
  const { config } = useCustomization();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const styleId = 'custom-cursor-override-style';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    if (config.cursorType === 'cross') {
      const cursorUrl = config.cursorCustomUrl || 'https://cur.cursors-4u.net/cursors/cur-4/cur381.cur';
      styleTag.innerHTML = `* { cursor: url("${cursorUrl}"), auto !important; }`;
    } else if (config.cursorType === 'custom' && config.cursorCustomUrl) {
      styleTag.innerHTML = `* { cursor: url("${config.cursorCustomUrl}"), auto !important; }`;
    } else {
      styleTag.innerHTML = '';
    }

    return () => {
      if (styleTag) {
        styleTag.innerHTML = '';
      }
    };
  }, [config.cursorType, config.cursorCustomUrl]);

  return null;
}
