export default"# Vue\n\nWe provide vue support out of box.\n\n> Vue version should be 3.x\n\n## Install the Dependencies\n\nExcept the `@milkdown/core`, preset and theme. We need to install the `@milkdown/vue`, which provide lots of abilities for vue in milkdown.\n\n```bash\n# install with npm\nnpm install @milkdown/vue @milkdown/core\n\n# optional\nnpm install @milkdown/preset-commonmark @milkdown/theme-nord\n```\n\n## Create a Component\n\nCreate a component is pretty easy.\n\n```typescript\nimport { defineComponent } from 'vue';\nimport { Editor, rootCtx } from '@milkdown/core';\nimport { VueEditor, useEditor } from '@milkdown/vue';\nimport { commonmark } from '@milkdown/preset-commonmark';\n\nimport '@milkdown/theme-nord/lib/theme.css';\nimport '@milkdown/preset-commonmark/lib/style.css';\n\nexport const MilkdownEditor = defineComponent(() => {\n    const editor = useEditor((root) =>\n        new Editor()\n            .config((ctx) => {\n                ctx.set(rootCtx, root);\n            })\n            .use(commonmark),\n    );\n\n    return () => <VueEditor editor={editor} />;\n});\n```\n\n### Online Demo\n\n!CodeSandBox{milkdown-vue-setup-wjdup?fontsize=14&hidenavigation=1&theme=dark&view=preview}\n\n---\n\n## Custom Component for Node\n\nWe provide custom node support out of box.\n\n```typescript\nimport { inject, defineComponent, DefineComponent } from 'vue';\nimport { Editor, rootCtx } from '@milkdown/core';\nimport { VueEditor, useEditor } from '@milkdown/vue';\nimport { commonmark, paragraph, image } from '@milkdown/preset-commonmark';\nimport { Node } from 'prosemirror-model';\n\nconst CustomParagraph: DefineComponent = defineComponent({\n    name: 'my-paragraph',\n    setup(_, { slots }) {\n        return () => <div class=\"vue-paragraph\">{slots.default?.()}</div>;\n    },\n});\n\nconst CustomImage: DefineComponent = defineComponent({\n    name: 'my-image',\n    setup() {\n        const node: Node = inject('node', {} as Node);\n\n        return () => <img class=\"vue-image\" src={node.attrs.src} alt={node.attrs.alt} />;\n    },\n});\n\nexport const MyEditor = defineComponent(() => {\n    const editor = useEditor((root, renderVue) => {\n        const nodes = commonmark\n            .configure(paragraph, {\n                view: renderVue(CustomParagraph),\n            })\n            .configure(image, {\n                view: renderVue(CustomImage),\n            });\n        return new Editor()\n            .config((ctx) => {\n                ctx.set(rootCtx, root);\n            })\n            .use(nodes);\n    });\n\n    return () => <VueEditor editor={editor} />;\n});\n```\n\nValues that is injected for custom component:\n\n-   _editor_:\n\n    Instance of current milkdown editor.\n\n-   _node_:\n\n    Current prosemirror node need to be rendered.\n    Equal to [node parameter in nodeViews](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).\n\n-   _view_:\n\n    Current prosemirror editor view.\n    Equal to [view parameter in nodeViews](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).\n\n-   _getPos_:\n\n    Method to get position of current prosemirror node.\n    Equal to [getPos parameter in nodeViews](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).\n\n-   _decorations_:\n\n    Decorations of current prosemirror node.\n    Equal to [decorations parameter in nodeViews](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).\n";
