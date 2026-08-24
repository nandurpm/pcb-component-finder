# PCB Component Finder

**PCB Component Finder** is a local manual annotation MVP for exploring PCB images. It supports image upload, zoom/pan, drawn component regions, reference designators, types, labels, notes, confidence, project save/load, JSON export, and annotated-PNG export.

> **Recognition boundary:** This version deliberately contains **no automatic component recognition**. Every designator, type, label, note, confidence value, and region is manual documentation. Verify the actual board, silkscreen, schematic, and datasheets before relying on an annotation.

| Layer | Responsibility |
|---|---|
| Image viewer | Loads local images, zooms, pans, and maps pointer input to image coordinates. |
| Annotation model | Stores normalized `x`, `y`, `width`, and `height` so regions scale with the board image. |
| Project persistence | Saves/loads a versioned JSON project containing manual annotations and the local image data URL. |
| Export | Downloads the project JSON or the currently rendered annotated PNG. |

## Local Linux and Windows use

Install **Node.js 22+** and pnpm. This is a portable local application, not a hosted service or native installer, and has no public website URL.

| Task | Linux / macOS shell | Windows PowerShell or Command Prompt |
|---|---|---|
| Generate synthetic demo board | `./run-local.sh demo --out reports/demo` | `run-local.cmd demo --out reports\demo` |
| Serve local annotation workspace | `./run-local.sh serve reports/demo --port=4063` | `run-local.cmd serve reports\demo --port=4063` |

The server binds only to `127.0.0.1`. Uploaded board images and project files remain in the browser session until you explicitly download a JSON project. The included board is synthetic and all sample regions are illustrative manual annotations.

## Validation

```bash
pnpm install
pnpm test
pnpm check
pnpm demo
```

Tests cover annotation serialization, normalized coordinate scaling, malformed-project rejection, and demo export.

## License

MIT.
