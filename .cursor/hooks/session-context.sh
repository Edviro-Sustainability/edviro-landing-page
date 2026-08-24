#!/bin/bash
# sessionStart hook: emit the repo README (the docs table of contents) as
# additional_context so agents start every session with the ecosystem map,
# docs map (Notion page URLs), and code map.
#
# Deliberately fail-open: context injection is an enhancement, never a gate.
# Does NOT duplicate AGENTS.md (Cursor auto-loads it) and does not fetch
# Notion (hooks can't call MCP) - the README carries the Notion page names,
# URLs, and the Monoid canvas id so the agent fetches detail on demand.
#
# Known limitation (Aug 2026): Cursor has a confirmed bug where sessionStart
# additional_context is dropped before reaching the model (forum #158452).
# The output shape below is the documented contract and will start working
# when the fix ships; until then AGENTS.md carries a pointer to the README.

cat > /dev/null # drain stdin; sessionStart input is unused

readme="README.md"
if [ ! -f "$readme" ] || ! command -v jq > /dev/null 2>&1; then
  exit 0
fi

jq -Rs '{additional_context: ("Repo README (docs table of contents - the docs map lists the Notion page for each component):\n\n" + .)}' < "$readme"
exit 0
