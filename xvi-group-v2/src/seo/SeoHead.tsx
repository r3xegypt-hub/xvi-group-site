// XVI GROUP — SEO Head Manager
// Keeps document metadata in sync with the current route and language.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { useLanguage } from '../hooks/LanguageProvider';
import { getPageMeta } from './seoConfig';

const BASE_URL = SITE_CONFIG.url;

export function resolveUrl(path: string): string {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return `${BASE_URL}${normalized}`;
}

function upsertMeta(selector: string, name: string | null, property: string | null, apply: (el: HTMLMetaElement) => void) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (name) el.setAttribute('name', name);
    if (property) el.setAttribute('property', property);
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
  const { language } = useLanguage();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const localized = meta[language];
    const url = resolveUrl(pathname);

    document.title = localized.title;

    upsertMeta('meta[name="description"]', 'description', null, (el) => { el.setAttribute('content', localized.description); });

    upsertMeta('meta[property="og:title"]', null, 'og:title', (el) => { el.setAttribute('content', localized.title); });
    upsertMeta('meta[property="og:description"]', null, 'og:description', (el) => { el.setAttribute('content', localized.description); });
    upsertMeta('meta[property="og:url"]', null, 'og:url', (el) => { el.setAttribute('content', url); });
    upsertMeta('meta[property="og:locale"]', null, 'og:locale', (el) => { el.setAttribute('content', language === 'ar' ? 'ar_AE' : 'en_US'); });
    upsertMeta('meta[property="og:site_name"]', null, 'og:site_name', (el) => { el.setAttribute('content', SITE_CONFIG.name.en); });

    upsertMeta('meta[name="twitter:title"]', 'twitter:title', null, (el) => { el.setAttribute('content', localized.title); });
    upsertMeta('meta[name="twitter:description"]', 'twitter:description', null, (el) => { el.setAttribute('content', localized.description); });

    upsertLink('canonical', (el) => { el.href = url; });
  }, [pathname, language]);

  return null;
}
