import { describe, expect, it } from 'vitest'
import {
  navigationRooms,
  heroSignals,
  editorialMetrics,
  services,
  storyPanels,
  processSteps,
  magazineColumns,
  industries,
  technologies,
  networkNodes,
  aboutPillars,
  differentiators,
  testimonials,
  faqs,
  contactDetails,
} from './siteContent'

describe('navigationRooms', () => {
  it('is non-empty', () => {
    expect(navigationRooms.length).toBeGreaterThan(0)
  })

  it('each item has id, label, eyebrow', () => {
    for (const room of navigationRooms) {
      expect(room.id).toBeTruthy()
      expect(room.label).toBeTruthy()
      expect(room.eyebrow).toBeTruthy()
    }
  })
})

describe('heroSignals', () => {
  it('is non-empty', () => {
    expect(heroSignals.length).toBeGreaterThan(0)
  })

  it('each item has value and label', () => {
    for (const signal of heroSignals) {
      expect(signal.value).toBeTruthy()
      expect(signal.label).toBeTruthy()
    }
  })
})

describe('editorialMetrics', () => {
  it('is non-empty', () => {
    expect(editorialMetrics.length).toBeGreaterThan(0)
  })

  it('each item has value and label', () => {
    for (const metric of editorialMetrics) {
      expect(metric.value).toBeTruthy()
      expect(metric.label).toBeTruthy()
    }
  })
})

describe('services', () => {
  it('is non-empty', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('each item has number, title, description, tags', () => {
    for (const service of services) {
      expect(service.number).toBeTruthy()
      expect(service.title).toBeTruthy()
      expect(service.description).toBeTruthy()
      expect(Array.isArray(service.tags)).toBe(true)
      expect(service.tags.length).toBeGreaterThan(0)
    }
  })
})

describe('storyPanels', () => {
  it('is non-empty', () => {
    expect(storyPanels.length).toBeGreaterThan(0)
  })

  it('each item has eyebrow, title, body, outcome', () => {
    for (const panel of storyPanels) {
      expect(panel.eyebrow).toBeTruthy()
      expect(panel.title).toBeTruthy()
      expect(panel.body).toBeTruthy()
      expect(panel.outcome).toBeTruthy()
    }
  })
})

describe('processSteps', () => {
  it('is non-empty', () => {
    expect(processSteps.length).toBeGreaterThan(0)
  })

  it('each item has step, title, description', () => {
    for (const step of processSteps) {
      expect(step.step).toBeTruthy()
      expect(step.title).toBeTruthy()
      expect(step.description).toBeTruthy()
    }
  })
})

describe('magazineColumns', () => {
  it('is non-empty', () => {
    expect(magazineColumns.length).toBeGreaterThan(0)
  })

  it('each item has eyebrow, title, text', () => {
    for (const col of magazineColumns) {
      expect(col.eyebrow).toBeTruthy()
      expect(col.title).toBeTruthy()
      expect(col.text).toBeTruthy()
    }
  })
})

describe('industries', () => {
  it('is non-empty', () => {
    expect(industries.length).toBeGreaterThan(0)
  })

  it('all items are non-empty strings', () => {
    for (const industry of industries) {
      expect(typeof industry).toBe('string')
      expect(industry.length).toBeGreaterThan(0)
    }
  })
})

describe('technologies', () => {
  it('is non-empty', () => {
    expect(technologies.length).toBeGreaterThan(0)
  })

  it('all items are non-empty strings', () => {
    for (const tech of technologies) {
      expect(typeof tech).toBe('string')
      expect(tech.length).toBeGreaterThan(0)
    }
  })
})

describe('networkNodes', () => {
  it('is non-empty', () => {
    expect(networkNodes.length).toBeGreaterThan(0)
  })

  it('each item has label, x, y, accent', () => {
    for (const node of networkNodes) {
      expect(node.label).toBeTruthy()
      expect(typeof node.x).toBe('number')
      expect(typeof node.y).toBe('number')
      expect(node.accent).toBeTruthy()
    }
  })
})

describe('aboutPillars', () => {
  it('is non-empty', () => {
    expect(aboutPillars.length).toBeGreaterThan(0)
  })

  it('each item has label and text', () => {
    for (const pillar of aboutPillars) {
      expect(pillar.label).toBeTruthy()
      expect(pillar.text).toBeTruthy()
    }
  })
})

describe('differentiators', () => {
  it('is non-empty', () => {
    expect(differentiators.length).toBeGreaterThan(0)
  })

  it('each item has title and text', () => {
    for (const diff of differentiators) {
      expect(diff.title).toBeTruthy()
      expect(diff.text).toBeTruthy()
    }
  })
})

describe('testimonials', () => {
  it('is non-empty', () => {
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('each item has quote, name, role', () => {
    for (const t of testimonials) {
      expect(t.quote).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.role).toBeTruthy()
    }
  })
})

describe('faqs', () => {
  it('is non-empty', () => {
    expect(faqs.length).toBeGreaterThan(0)
  })

  it('each item has q and a', () => {
    for (const faq of faqs) {
      expect(faq.q).toBeTruthy()
      expect(faq.a).toBeTruthy()
    }
  })
})

describe('contactDetails', () => {
  it('is non-empty', () => {
    expect(contactDetails.length).toBeGreaterThan(0)
  })

  it('each item has label and value', () => {
    for (const detail of contactDetails) {
      expect(detail.label).toBeTruthy()
      expect(detail.value).toBeTruthy()
    }
  })
})
