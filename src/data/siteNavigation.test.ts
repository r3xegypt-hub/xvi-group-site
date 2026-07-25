import { describe, expect, it } from 'vitest'
import { siteNavigation, footerNavigation } from './siteNavigation'

describe('siteNavigation', () => {
  it('is non-empty', () => {
    expect(siteNavigation.length).toBeGreaterThan(0)
  })

  it('each item has label and path', () => {
    for (const item of siteNavigation) {
      expect(item.label).toBeTruthy()
      expect(item.path).toBeTruthy()
    }
  })

  it('all paths start with /', () => {
    for (const item of siteNavigation) {
      expect(item.path.startsWith('/')).toBe(true)
    }
  })

  it('has unique paths', () => {
    const paths = siteNavigation.map((item) => item.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('has unique labels', () => {
    const labels = siteNavigation.map((item) => item.label)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('home item exists at root path', () => {
    const home = siteNavigation.find((item) => item.path === '/')
    expect(home).toBeDefined()
    expect(home!.label).toBeTruthy()
  })
})

describe('footerNavigation', () => {
  it('is non-empty and larger than siteNavigation', () => {
    expect(footerNavigation.length).toBeGreaterThan(0)
    expect(footerNavigation.length).toBeGreaterThanOrEqual(siteNavigation.length)
  })

  it('contains all siteNavigation items', () => {
    for (const item of siteNavigation) {
      const found = footerNavigation.find((f) => f.path === item.path)
      expect(found).toBeDefined()
      expect(found!.label).toBe(item.label)
    }
  })

  it('has unique paths', () => {
    const paths = footerNavigation.map((item) => item.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('each item has label and path', () => {
    for (const item of footerNavigation) {
      expect(item.label).toBeTruthy()
      expect(item.path).toBeTruthy()
    }
  })
})
