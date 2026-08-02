// XVI GROUP — SEO Head Manager
// Keeps canonical + basic document metadata in sync with the current route.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config';

const BASE_URL = SITE_CONFIG.url;

export function resolveUrl(path: string): string {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return `${BASE_URL}${normalized}`;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, apply: (el: HTMLMetaElement) => void) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

function upsertLink(rel: string, apply: (el: HTMLLinkElement) => void) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  apply(el);
}

export function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = resolveUrl(pathname);
    upsertLink('canonical', (el) => { el.href = url; });
    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      return meta;
    }, (el) => { el.setAttribute('content', url); });
  }, [pathname]);

  return null;
}
