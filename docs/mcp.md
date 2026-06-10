# MCP Integration

PAMH exposes a Model Context Protocol server over stdio.

## Automatic Project Setup

Running the default project initializer configures best-effort MCP and agent instruction files:

```bash
memory init project
```

Generated or updated files:

- `AGENTS.md` for Codex-style and generic agent instructions
- `CLAUDE.md` for Claude Code project instructions
- `opencode.json` for OpenCode MCP configuration
- `.mcp.json` for clients that read project MCP configuration
- `.cursor/mcp.json` for Cursor MCP configuration
- `.cursor/rules/pamh.mdc` for Cursor project rules
- `.github/copilot-instructions.md` for GitHub Copilot project instructions

Existing files are not blindly overwritten. Markdown instruction files receive a managed PAMH block, and JSON config files are merged when they contain valid JSON. Invalid JSON config files are skipped and reported.

Use this only to initialize memory storage without integration files:

```bash
memory init project --no-integrations
```

## Start Server

```bash
memory server start
```

The server uses the current working directory as the project root. Project memory is resolved from `./.ai-memory`; global memory is resolved from `~/ai-memory`.

## Available Tools

- `search_memory` - Search memories by text, type, tag, and scope
- `get_memory` - Get a memory by ID
- `add_memory` - Add a new memory
- `edit_memory` - Edit an existing memory
- `delete_memory` - Logically delete a memory
- `list_projects` - List current and linked projects
- `compile_context` - Compile global, project, linked, and search context

## Capture Model

PAMH is not a background recorder. It does not watch OpenCode, editors, terminals, or LLM conversations automatically.

Memory is created only when one of these actions happens:

- a user runs a CLI command such as `memory add`
- a user creates a memory in the local UI
- an MCP client explicitly calls `add_memory`

This is intentional for control and transparency. If an MCP client completes useful work, instruct it to save the relevant decision, task, mistake, or project state through PAMH.

Example agent instruction:

```text
When you make a durable project decision, learn a reusable fact, or finish a meaningful task, call the PAMH add_memory tool with a concise summary. Do not store secrets.
```

Example manual fallback:

```bash
memory add --project -t session -s project --tags "opencode,setup" -c "Initialized a React project with Tailwind and shadcn components."
```

## Example Client Configuration

```json
{
  "mcpServers": {
    "pamh": {
      "command": "memory",
      "args": ["server", "start"]
    }
  }
}
```

For local development before publishing the CLI, use Node directly:

```json
{
  "mcpServers": {
    "pamh": {
      "command": "node",
      "args": ["/path/to/pamh/packages/cli/dist/index.js", "server", "start"]
    }
  }
}
```
