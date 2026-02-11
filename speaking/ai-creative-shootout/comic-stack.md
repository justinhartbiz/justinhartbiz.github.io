# Mode C: The Comic Strip — Technical Stack

## How It Works

The Comic Strip mode generates **4 illustrated panels** with AI, then overlays **HTML/CSS speech bubbles** for the dialogue. No text is baked into images — all text is rendered as DOM elements for perfect readability and instant localization.

## Architecture

```
[Prompt] → [Image Gen API] → [4 blank panels (no text)] → [HTML overlay with speech bubbles]
```

## Image Generation

| Option | Model | Speed | Cost/image | Notes |
|--------|-------|-------|-----------|-------|
| **Fast & Cheap** | Stability SDXL (via Wavespeed) | ~5s | $0.003 | Great for B&W comic style |
| **Higher Quality** | FLUX.1 SRPO [dev] | ~8s | $0.025 | Better composition |
| **Best Quality** | GPT Image 1 (via Wavespeed) | ~12s | $0.042 | Best prompt adherence |
| **Alternative** | Recraft V3 (via Replicate) | ~6s | $0.04 | Excellent for illustration |

### Total cost per comic: **$0.01 – $0.17** (4 panels)
### Total generation time: **5-15 seconds** (parallel)

## Prompting Strategy

### Keeping Characters Consistent

1. **Style Anchoring:** Every prompt starts with the same style prefix:
   ```
   Black and white comic book panel, dramatic ink art style, bold linework, halftone dots, high contrast
   ```

2. **Character Descriptions:** Use consistent, detailed character descriptions across panels:
   - Patriot: "noble eagle-human hybrid in a sharp suit"
   - Skeptic: "noir detective with magnifying glass, trenchcoat, fedora"
   - Urgency: "frantic character with megaphone"

3. **For production:** Train a **LoRA** (Low-Rank Adaptation) on 10-20 reference images of each character. SDXL LoRA training via Wavespeed costs ~$1.00 and takes minutes. This locks character identity across unlimited panels.

4. **Seed pinning:** Use fixed seeds for reproducible results during live demos.

## Speech Bubbles: The HTML Overlay Trick

### Why NOT generate text in images:
- AI image models **can't reliably render text** (misspellings, gibberish)
- Even models that can (FLUX, GPT-Image) are **slow** and **expensive** for long text
- You lose the ability to edit, translate, or animate text after the fact

### Why HTML overlays win:
- **Perfect typography** — any font, any size, any language
- **Instant translation** — swap text, keep images
- **Animatable** — fade in, typewriter effect, etc.
- **Accessible** — screen readers can read the bubbles
- **Editable** — change copy without regenerating images

### Implementation:
```css
.bubble {
  position: absolute;
  background: #fff;
  color: #111;
  padding: 10px 14px;
  border-radius: 16px;
  font-weight: 700;
}
.bubble::after {  /* tail pointer */
  content: '';
  position: absolute;
  bottom: -10px;
  left: 30px;
  border: 10px solid transparent;
  border-top-color: #fff;
}
```

## Live Demo Flow

1. User clicks "Generate Comic"
2. Show loading spinners in each panel
3. Fire 4 parallel image generation API calls
4. As each returns, fade in the panel image
5. After image appears, animate the speech bubble in
6. After all 4, reveal the "Consensus" final copy

## Cost Summary

| Component | Cost |
|-----------|------|
| 4 SDXL panels | $0.012 |
| HTML/CSS rendering | $0.00 |
| **Total per comic** | **~$0.01** |

At FLUX quality: ~$0.10 per comic. At GPT-Image quality: ~$0.17 per comic.

## Files

- `demo/comic.html` — The prototype
- `demo/comic-assets/panel{1-4}-*.png` — Pre-generated panels (SDXL via Wavespeed)
- `comic-stack.md` — This file
