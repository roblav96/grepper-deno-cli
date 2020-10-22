#!/usr/bin/env just --justfile
# https://github.com/casey/just

_default :
	mkdir -p node_modules/.cache
	ln -sf "$DENO_DIR" node_modules/.cache/deno

cache :
	deno cache --unstable --no-check mod.ts
watch-cache :
	watchexec -- just cache

run :
	deno run --unstable --allow-all mod.ts
watch-run :
	watchexec -- just run
