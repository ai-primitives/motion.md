import { Theme, getThemeColors } from "@code-hike/lighter";
import { ThemeConfig } from "./types";

export const defaultTheme: ThemeConfig = {
  background: "#1a1b26",
  text: "#a9b1d6",
  primary: "#7aa2f7",
  lineNumbers: "#444b6a",
  comments: "#565f89",
  types: "#2ac3de",
  strings: "#9ece6a",
  keywords: "#bb9af7",
  functions: "#7aa2f7",
  numbers: "#ff9e64",
};

export async function loadTheme(themeName: Theme): Promise<ThemeConfig> {
  try {
    const colors = await getThemeColors(themeName);
    const tokenColors = colors.editor?.tokenColors || [];

    const findColor = (scopes: string[]): string | undefined => {
      for (const scope of scopes) {
        const rule = tokenColors.find((rule) => {
          if (Array.isArray(rule.scope)) {
            return rule.scope.some((s) => s.includes(scope));
          }
          return rule.scope?.includes(scope);
        });
        if (rule?.settings?.foreground) {
          return rule.settings.foreground;
        }
      }
      return undefined;
    };

    return {
      background: colors.editor?.background || defaultTheme.background,
      text: colors.editor?.foreground || defaultTheme.text,
      primary: colors.editorLineNumber?.foreground || defaultTheme.primary,
      lineNumbers: colors.editorLineNumber?.foreground || defaultTheme.lineNumbers,
      comments: findColor(["comment"]) || defaultTheme.comments,
      types: findColor(["entity.name.type", "support.type"]) || defaultTheme.types,
      strings: findColor(["string"]) || defaultTheme.strings,
      keywords: findColor(["keyword", "storage.type"]) || defaultTheme.keywords,
      functions: findColor(["entity.name.function", "support.function"]) || defaultTheme.functions,
      numbers: findColor(["constant.numeric"]) || defaultTheme.numbers,
    };
  } catch (error) {
    console.warn(`Failed to load theme ${themeName}, using default theme:`, error);
    return defaultTheme;
  }
}
