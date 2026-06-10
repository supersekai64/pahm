import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { configureProjectIntegrations } from './integrations.js'

describe('integrations', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'pamh-integrations-test-'))
  })

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  it('should create project integration files', async () => {
    const result = await configureProjectIntegrations(tempDir)

    expect(result.results.every((entry) => entry.status === 'created')).toBe(true)
    expect(existsSync(join(tempDir, 'AGENTS.md'))).toBe(true)
    expect(existsSync(join(tempDir, 'CLAUDE.md'))).toBe(true)
    expect(existsSync(join(tempDir, 'opencode.json'))).toBe(true)
    expect(existsSync(join(tempDir, '.mcp.json'))).toBe(true)
    expect(existsSync(join(tempDir, '.cursor', 'mcp.json'))).toBe(true)
    expect(existsSync(join(tempDir, '.cursor', 'rules', 'pamh.mdc'))).toBe(true)
    expect(existsSync(join(tempDir, '.github', 'copilot-instructions.md'))).toBe(true)
  })

  it('should configure opencode MCP and instructions', async () => {
    await configureProjectIntegrations(tempDir)

    const raw = await readFile(join(tempDir, 'opencode.json'), 'utf-8')
    const config = JSON.parse(raw)

    expect(config.instructions).toContain('AGENTS.md')
    expect(config.mcp.pamh).toEqual({
      type: 'local',
      command: ['memory', 'server', 'start'],
      enabled: true,
    })
  })

  it('should merge existing opencode config', async () => {
    await writeFile(
      join(tempDir, 'opencode.json'),
      JSON.stringify({ username: 'tester', instructions: ['EXISTING.md'] }, null, 2),
      'utf-8'
    )

    await configureProjectIntegrations(tempDir)

    const raw = await readFile(join(tempDir, 'opencode.json'), 'utf-8')
    const config = JSON.parse(raw)

    expect(config.username).toBe('tester')
    expect(config.instructions).toEqual(['EXISTING.md', 'AGENTS.md'])
    expect(config.mcp.pamh.command).toEqual(['memory', 'server', 'start'])
  })

  it('should update marked instruction block idempotently', async () => {
    await configureProjectIntegrations(tempDir)
    const first = await readFile(join(tempDir, 'AGENTS.md'), 'utf-8')

    await configureProjectIntegrations(tempDir)
    const second = await readFile(join(tempDir, 'AGENTS.md'), 'utf-8')

    expect(second).toBe(first)
    expect(second.match(/PAMH:START/g)).toHaveLength(1)
  })

  it('should skip invalid existing JSON configs', async () => {
    await writeFile(join(tempDir, 'opencode.json'), '{ invalid json', 'utf-8')

    const result = await configureProjectIntegrations(tempDir)
    const opencodeResult = result.results.find((entry) => entry.path.endsWith('opencode.json'))

    expect(opencodeResult?.status).toBe('skipped')
  })
})
