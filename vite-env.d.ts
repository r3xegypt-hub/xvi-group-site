declare module 'vite-plugin-compression2' {
  import { Plugin } from 'vite'
  interface ViteCompressionPluginOption {
    include?: string | RegExp | (string | RegExp)[]
    exclude?: string | RegExp | (string | RegExp)[]
    threshold?: number
    filename?: string | ((id: string, metadata: { algorithm: string; options: Record<string, unknown> }) => string)
    deleteOriginalAssets?: boolean
    skipIfLargerOrEqual?: boolean
    logLevel?: 'info' | 'silent'
    algorithms?: ('gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw' | 'gz' | 'br' | 'brotli')[]
  }
  export default function compression(options?: ViteCompressionPluginOption): Plugin
  export function compression(options?: ViteCompressionPluginOption): Plugin
  export function defineAlgorithm(algorithm: string, options?: Record<string, unknown>): readonly [string, Record<string, unknown>]
}
