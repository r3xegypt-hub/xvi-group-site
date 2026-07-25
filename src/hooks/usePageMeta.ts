import { useEffect } from 'react'

const siteUrl = 'https://xvi-group.net'

type PageMeta = {
  title: string
  description: string
  canonical?: string
  schemaType?: 'AboutPage' | 'CollectionPage' | 'ContactPage' | 'WebPage' | 'Article'
}

function getOrCreateMeta(selector: string, attributes: Record<string, string>) {
  let element = document.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value))
    document.head.appendChild(element)
  }
  return element
}

function getOrCreateCanonical() {
  let element = document.querySelector<HTMLLinkElement>("link[rel='canonical']")
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  return element
}

export function usePageMeta({ title, description, canonical, schemaType = 'WebPage' }: PageMeta) {
  useEffect(() => {
    document.title = title
    const resolvedCanonical = canonical ?? `${siteUrl}${window.location.pathname}`

    getOrCreateMeta("meta[name='description']", { name: 'description' }).content = description
    getOrCreateMeta("meta[property='og:title']", { property: 'og:title' }).content = title
    getOrCreateMeta("meta[property='og:description']", { property: 'og:description' }).content = description
    getOrCreateMeta("meta[property='og:url']", { property: 'og:url' }).content = resolvedCanonical
    getOrCreateMeta("meta[name='twitter:title']", { name: 'twitter:title' }).content = title
    getOrCreateMeta("meta[name='twitter:description']", { name: 'twitter:description' }).content = description
    getOrCreateCanonical().href = resolvedCanonical
    const schemaId = 'xvi-page-schema'
    let schema = document.getElementById(schemaId) as HTMLScriptElement | null
    if (!schema) {
      schema = document.createElement('script')
      schema.id = schemaId
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: title,
      description,
      url: resolvedCanonical,
      isPartOf: { '@type': 'WebSite', name: 'XVI Group', url: siteUrl },
      publisher: { '@type': 'Organization', name: 'XVI Group', url: siteUrl },
    })
  }, [title, description, canonical, schemaType])
}

export default usePageMeta
