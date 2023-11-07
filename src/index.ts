import Parser from 'tree-sitter';

import JSON from 'tree-sitter-json';

const parser = new Parser();
parser.setLanguage(JSON);
