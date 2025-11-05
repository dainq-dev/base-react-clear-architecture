/**
 * Internationalization (i18n) module
 */

export type Locale = string;

export interface I18N {
  translate(key: string, values?: Record<string, string | number>): string;
  getLocale(): Locale;
}

export interface LocaleJSON {
  [key: string]: string | LocaleJSON;
}

export class I18NImpl implements I18N {
  private translations: LocaleJSON = {};

  constructor(
    private readonly locale: Locale,
    translations: LocaleJSON,
  ) {
    this.translations = translations;
  }

  translate(key: string, values?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: string | LocaleJSON | undefined = this.translations;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace placeholders
    if (values) {
      return value.replace(/\{(\w+)\}/g, (match, name) => {
        return String(values[name] ?? match);
      });
    }

    return value;
  }

  getLocale(): Locale {
    return this.locale;
  }
}

