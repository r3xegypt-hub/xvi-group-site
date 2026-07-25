import { describe, expect, it } from 'vitest'
import {
  businessConsulting,
  technologyConsulting,
  executiveTraining,
  aiTransformation,
} from './capabilityPages'
import type { CapabilityPageConfig } from '../components/executive/CapabilityPage'

const allPages: CapabilityPageConfig[] = [
  businessConsulting,
  technologyConsulting,
  executiveTraining,
  aiTransformation,
]

function validateCapabilityPage(page: CapabilityPageConfig) {
  expect(page.slug).toBeTruthy()
  expect(page.crumb).toBeTruthy()
  expect(page.eyebrow).toBeTruthy()
  expect(page.title).toBeTruthy()
  expect(page.description).toBeTruthy()
  expect(page.heroNote).toBeTruthy()
  expect(Array.isArray(page.heroSystem)).toBe(true)
  expect(page.heroSystem.length).toBe(3)
  expect(page.challenge).toBeTruthy()
  expect(page.perspective).toBeTruthy()
  expect(page.quote).toBeTruthy()
  expect(page.cta).toBeTruthy()

  // Array sections must be non-empty
  expect(page.capabilities.length).toBeGreaterThan(0)
  expect(page.process.length).toBeGreaterThan(0)
  expect(page.industries.length).toBeGreaterThan(0)
  expect(page.technology.length).toBeGreaterThan(0)
  expect(page.metrics.length).toBeGreaterThan(0)
  expect(page.framework.length).toBeGreaterThan(0)
  expect(page.table.length).toBeGreaterThan(0)

  // Detail objects have label and detail
  for (const item of page.capabilities) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }
  for (const item of page.process) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }
  for (const item of page.industries) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }
  for (const item of page.technology) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }
  for (const item of page.metrics) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }
  for (const item of page.framework) {
    expect(item.label).toBeTruthy()
    expect(item.detail).toBeTruthy()
  }

  // Table rows are 3-tuples
  for (const row of page.table) {
    expect(Array.isArray(row)).toBe(true)
    expect(row.length).toBe(3)
    for (const cell of row) {
      expect(typeof cell).toBe('string')
      expect(cell.length).toBeGreaterThan(0)
    }
  }

  // Case study
  expect(page.caseStudy.title).toBeTruthy()
  expect(page.caseStudy.caption).toBeTruthy()
  expect(page.caseStudy.chapters.length).toBeGreaterThan(0)
  for (const ch of page.caseStudy.chapters) {
    expect(ch.label).toBeTruthy()
    expect(ch.detail).toBeTruthy()
  }
}

describe('businessConsulting', () => {
  it('has all required sections', () => {
    validateCapabilityPage(businessConsulting)
  })

  it('has correct slug', () => {
    expect(businessConsulting.slug).toBe('business-consulting')
  })
})

describe('technologyConsulting', () => {
  it('has all required sections', () => {
    validateCapabilityPage(technologyConsulting)
  })

  it('has correct slug', () => {
    expect(technologyConsulting.slug).toBe('technology-consulting')
  })
})

describe('executiveTraining', () => {
  it('has all required sections', () => {
    validateCapabilityPage(executiveTraining)
  })

  it('has correct slug', () => {
    expect(executiveTraining.slug).toBe('executive-training')
  })
})

describe('aiTransformation', () => {
  it('has all required sections', () => {
    validateCapabilityPage(aiTransformation)
  })

  it('has correct slug', () => {
    expect(aiTransformation.slug).toBe('ai-transformation')
  })
})

describe('all capability pages', () => {
  it('have unique slugs', () => {
    const slugs = allPages.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('have unique crumbs', () => {
    const crumbs = allPages.map((p) => p.crumb)
    expect(new Set(crumbs).size).toBe(crumbs.length)
  })

  it('have at least 4 capabilities each', () => {
    for (const page of allPages) {
      expect(page.capabilities.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('have at least 3 process steps each', () => {
    for (const page of allPages) {
      expect(page.process.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('have at least 3 industry entries each', () => {
    for (const page of allPages) {
      expect(page.industries.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('have at least 3 technology entries each', () => {
    for (const page of allPages) {
      expect(page.technology.length).toBeGreaterThanOrEqual(3)
    }
  })
})
