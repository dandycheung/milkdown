import { createCommand } from '@milkdown/core';
import { createNode } from '@milkdown/utils';
import { wrapIn } from 'prosemirror-commands';
import { wrappingInputRule } from 'prosemirror-inputrules';
import { SupportedKeys } from '../supported-keys';

type Keys = SupportedKeys['Blockquote'];

const id = 'blockquote';

export const WrapInBlockquote = createCommand();

export const blockquote = createNode<Keys>((_, utils) => ({
    id,
    schema: {
        content: 'block+',
        group: 'block',
        defining: true,
        parseDOM: [{ tag: 'blockquote' }],
        toDOM: (node) => ['blockquote', { class: utils.getClassName(node.attrs, id) }, 0],
    },
    parser: {
        match: ({ type }) => type === id,
        runner: (state, node, type) => {
            state.openNode(type).next(node.children).closeNode();
        },
    },
    serializer: {
        match: (node) => node.type.name === id,
        runner: (state, node) => {
            state.openNode('blockquote').next(node.content).closeNode();
        },
    },
    inputRules: (nodeType) => [wrappingInputRule(/^\s*>\s$/, nodeType)],
    commands: (nodeType) => [[WrapInBlockquote, wrapIn(nodeType)]],
    shortcuts: {
        [SupportedKeys.Blockquote]: {
            defaultKey: 'Mod-Shift-b',
            commandKey: WrapInBlockquote,
        },
    },
}));
