# FAQ

## Does PAMH replace an LLM memory feature?

No. PAMH gives users an independent memory layer that can be used across LLMs, editors, agents, and tools.

## Where is my data stored?

By default:

- global memory: `~/ai-memory`
- project memory: `./.ai-memory`

## Is SQLite the source of truth?

No. Markdown is the source of truth. SQLite is an index.

## Can I use PAMH offline?

Yes for core storage, text search, CLI, export/import, and MCP. Semantic search uses local embeddings by default, but the first local model download may require network access.

## Does semantic search require OpenAI?

No. PAMH uses a local embedding provider by default. OpenAI can be enabled explicitly with:

```bash
EMBEDDING_PROVIDER=openai
OPENAI_API_KEY=...
```

## What happens when I delete a memory?

The memory is logically deleted by setting `status: deleted`. It can be restored with:

```bash
memory restore <id>
```

## Can I export my memory?

Yes. Supported MVP export formats:

- ZIP
- JSON
- Markdown

Example:

```bash
memory export backup.zip
```

## Can MCP clients modify memory?

Yes. The MCP server exposes tools for adding, editing, deleting, searching, and compiling context.

## Does PAMH automatically record OpenCode or other AI sessions?

PAMH supports three capture modes:

- **manual** - You explicitly add memories
- **assisted** (default) - Agent proposes memories, you approve them
- **auto** - Agent creates memories directly based on rules

In assisted mode (the default), when an agent calls `add_memory`, the memory is created with `status: proposed`. You review and approve it with `memory approve <id>` or via the UI.

See [docs/capture-modes.md](capture-modes.md) for configuration details.

Example manual capture:

```bash
memory add --project -t session -s project --tags "opencode" -c "Implemented the initial React page with Tailwind and shadcn."
```

## Should I commit `.ai-memory` to Git?

That depends on the project. If memory contains only project knowledge and no secrets, committing it can make memory portable with the repository. Review `docs/security.md` before doing so.
