import type { ReactNode } from 'react'
import { Container } from './Container'

type PageContentProps = {
  title: string
  children: ReactNode
}

/** Shared semantic shell for the lightweight routed content pages. */
export function PageContent({ title, children }: PageContentProps) {
  return (
    <Container as="article" maxWidthClass="" className="px-6 py-12">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {children}
    </Container>
  )
}

export default PageContent
