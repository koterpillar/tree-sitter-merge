import Parser, { SyntaxNode } from 'tree-sitter';

import JSON from 'tree-sitter-json';

type Language = 'json';

const languages: Record<Language, any> = {
  json: JSON,
};

function prettyPrint(node: SyntaxNode, level = 0): void {
  const indent = '  '.repeat(level);
  if (node.isNamed) {
    console.log(indent, node.type, node.text.replace(/\n/g, '\\n'));
  } else {
    console.log(indent, node.type);
  }
  for (const child of node.children) {
    prettyPrint(child, level + 1);
  }
}

export function merge(language: Language, base: string, left: string, right: string): string {
  const parser = new Parser();
  parser.setLanguage(languages[language]);

  const baseTree = parser.parse(base);

  prettyPrint(baseTree.rootNode);

  throw new Error('Not implemented');
}
