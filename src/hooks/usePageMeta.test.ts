import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { usePageMeta } from './usePageMeta'

afterEach(() => {
  document.title = ''
  document.head.innerHTML = ''
})

describe('usePageMeta', () => {
  it('sets document.title', () => {
    renderHook(() =>
      usePageMeta({ title: 'My Page', description: 'desc' })
    )
    expect(document.title).toBe('My Page')
  })

  it('sets meta description', () => {
    renderHook(() =>
      usePageMeta({ title: 't', description: 'My description' })
    )
    const meta = document.querySelector<HTMLMetaElement>("meta[name='description']")
    expect(meta).not.toBeNull()
    expect(meta!.content).toBe('My description')
  })

  it('sets canonical URL explicitly', () => {
    renderHook(() =>
      usePageMeta({
        title: 't',
        description: 'd',
        canonical: 'https://xvi-group.net/about',
      })
    )
    const link = document.querySelector<HTMLLinkElement>("link[rel='canonical']")
    expect(link).not.toBeNull()
    expect(link!.href).toBe('https://xvi-group.net/about')
  })

  it('resolves canonical URL from pathname when not provided', () => {
    // jsdom default location.pathname is '/'
    renderHook(() =>
      usePageMeta({ title: 't', description: 'd' })
    )
    const link = document.querySelector<HTMLLinkElement>("link[rel='canonical']")
    expect(link!.href).toBe('https://xvi-group.net/')
  })

  it('sets Open Graph meta tags', () => {
    renderHook(() =>
      usePageMeta({ title: 'OG Title', description: 'OG Desc' })
    )
    expect(document.querySelector("meta[property='og:title']")?.getAttribute('content')).toBe('OG Title')
    expect(document.querySelector("meta[property='og:description']")?.getAttribute('content')).toBe('OG Desc')
    expect(document.querySelector("meta[property='og:url']")).not.toBeNull()
  })

  it('sets Twitter meta tags', () => {
    renderHook(() =>
      usePageMeta({ title: 'Tw Title', description: 'Tw Desc' })
    )
    expect(document.querySelector("meta[name='twitter:title']")?.getAttribute('content')).toBe('Tw Title')
    expect(document.querySelector("meta[name='twitter:description']")?.getAttribute('content')).toBe('Tw Desc')
  })

  it('creates JSON-LD schema', () => {
    renderHook(() =>
      usePageMeta({ title: 'Schema Page', description: 'sd' })
    )
    const script = document.getElementById('xvi-page-schema') as HTMLScriptElement
    expect(script).not.toBeNull()
    expect(script.type).toBe('application/ld+json')
    const data = JSON.parse(script.text)
    expect(data['@type']).toBe('WebPage')
    expect(data.name).toBe('Schema Page')
  })

  it('uses custom schemaType', () => {
    renderHook(() =>
      usePageMeta({ title: 't', description: 'd', schemaType: 'Article' })
    )
    const script = document.getElementById('xvi-page-schema') as HTMLScriptElement
    const data = JSON.parse(script.text)
    expect(data['@type']).toBe('Article')
  })

  it('does not create duplicate meta tags on re-render', () => {
    const { rerender } = renderHook(
      ({ title, description }) => usePageMeta({ title, description }),
      { initialProps: { title: 'v1', description: 'd1' } }
    )
    rerender({ title: 'v2', description: 'd2' })
    const metas = document.querySelectorAll("meta[name='description']")
    expect(metas).toHaveLength(1)
    expect(metas[0].getAttribute('content')).toBe('d2')
  })

  it('does not create duplicate og:title tags on re-render', () => {
    const { rerender } = renderHook(
      ({ title, description }) => usePageMeta({ title, description }),
      { initialProps: { title: 'v1', description: 'd' } }
    )
    rerender({ title: 'v2', description: 'd' })
    expect(document.querySelectorAll("meta[property='og:title']")).toHaveLength(1)
    expect(document.querySelector("meta[property='og:title']")?.getAttribute('content')).toBe('v2')
  })
})
