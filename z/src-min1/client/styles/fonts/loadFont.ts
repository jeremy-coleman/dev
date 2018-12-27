import { fontFace } from 'typestyle'
import { url } from 'csx'

const FONT_STYLES = {
  normal: 'Regular',
  italic: 'Italic'
}

const FONT_WEIGHTS = {
  100: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  700: 'Bold',
  900: 'Black'
}

type FontStyle = keyof typeof FONT_STYLES
type FontWeight = keyof typeof FONT_WEIGHTS

type Font = {
  name: string
  styles: FontStyle[]
  weights: FontWeight[]
}

/**
 * Helper to load fonts downloaded from Google Fonts.
 * Reference fonts in index.ts
 */

export function loadFont(font: Font) {
  font.styles.forEach(fontStyle =>
    font.weights.forEach(fontWeight => {
      const suffix =
        fontWeight === 400
          ? FONT_STYLES[fontStyle]
          : fontStyle === 'normal'
            ? FONT_WEIGHTS[fontWeight]
            : FONT_WEIGHTS[fontWeight] + FONT_STYLES[fontStyle]

      fontFace({
        fontFamily: font.name,
        fontWeight,
        fontStyle,
        src: url(require(`./${font.name}/${font.name}-${suffix}.ttf`))
      })
    })
  )
  return font.name
}
