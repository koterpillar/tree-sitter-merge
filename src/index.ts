import Parser from 'tree-sitter';

import JSON from 'tree-sitter-json';

type Language = 'json';

const languages: Record<Language, any> = {
  json: JSON,
};

export function merge(language: Language, base: string, left: string, right: string): string {
  const parser = new Parser();
  parser.setLanguage(languages[language]);

  throw new Error('Not implemented');
}
