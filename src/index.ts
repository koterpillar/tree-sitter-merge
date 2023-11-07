import Parser, { SyntaxNode } from "tree-sitter";

import JSON from "tree-sitter-json";

type Language = "json";

const languages: Record<Language, any> = {
  json: JSON,
};

function prettyPrint(node: SyntaxNode, level = 0): void {
  const indent = "  ".repeat(level);
  if (!node.isNamed) {
    console.log(indent, node.type);
  } else if (node.type === "string" || node.type === "number") {
    console.log(indent, node.text.replace(/\n/g, "\\n"));
  } else {
    console.log(indent, node.type);
    for (const child of node.children) {
      prettyPrint(child, level + 1);
    }
  }
}

type NodeKind = NodeKindPrimitive | NodeKindChildren;

type NodeKindPrimitive = {
  readonly kind: "primitive";
};

const PRIMITIVE: NodeKindPrimitive = { kind: "primitive" };

type NodeKindChildren = {
  readonly kind: "children";
  readonly childKey: (node: SyntaxNode) => string | null;
};

const CHILDREN_SIMPLE: NodeKindChildren = {
  kind: "children",
  childKey: () => null,
};

export function nodeKind(language: Language, node: SyntaxNode): NodeKind {
  if (!node.isNamed || node.type === "string" || node.type === "number") {
    return PRIMITIVE;
  }
  if (node.type === "object") {
    return {
      kind: "children",
      childKey: (node: SyntaxNode) =>
        node.type === "pair" ? node.children[0].text : null,
    };
  }
  return CHILDREN_SIMPLE;
}

export function mergeNodes(
  language: Language,
  base: SyntaxNode,
  left: SyntaxNode,
  right: SyntaxNode
): SyntaxNode {
  prettyPrint(base);
  throw new Error("Not implemented");
}

export function merge(
  language: Language,
  base: string,
  left: string,
  right: string
): string {
  const parser = new Parser();
  parser.setLanguage(languages[language]);

  const baseNode = parser.parse(base).rootNode;
  const leftNode = parser.parse(left).rootNode;
  const rightNode = parser.parse(right).rootNode;

  const resultNode = mergeNodes(language, baseNode, leftNode, rightNode);

  return resultNode.toString();
}
