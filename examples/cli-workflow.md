# CLI Workflow Example

This example demonstrates manual CLI usage for adding memories, searching, and compiling context.

**Note:** For automatic memory capture with your AI agent (Cursor, Copilot, Claude Code, etc.), see [MCP Configuration](../docs/mcp.md) and the [Getting Started guide](../docs/getting-started.md#automatic-memory-capture-default).

## Initialize

```bash
memory init
```

## Add Memories

```bash
memory add --project -t decision -s project --tags "architecture,sqlite" -c "Use SQLite as a rebuildable local index."
memory add --project -t knowledge -s project --tags "typescript" -c "Core packages must stay independent from CLI and MCP."
memory add --project -t mistake -s project --tags "security" -c "Do not store secrets in memory files."
```

## List And Search

```bash
memory list --project
memory search "SQLite" --project
memory search --tag security --project
memory search "local index" --semantic --project
```

## Compile Context

```bash
memory context --project --query "architecture" --output
```

The compiled context is written to:

```text
.ai-memory/compiled-context.md
```
