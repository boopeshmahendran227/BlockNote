import { HeadingBlockContent } from "../nodes/BlockContent/HeadingBlockContent/HeadingBlockContent";
import { ImageBlockContent } from "../nodes/BlockContent/ImageBlockContent/ImageBlockContent";
import { BulletListItemBlockContent } from "../nodes/BlockContent/ListItemBlockContent/BulletListItemBlockContent/BulletListItemBlockContent";
import { NumberedListItemBlockContent } from "../nodes/BlockContent/ListItemBlockContent/NumberedListItemBlockContent/NumberedListItemBlockContent";
import { ParagraphBlockContent } from "../nodes/BlockContent/ParagraphBlockContent/ParagraphBlockContent";
import { createTipTapBlock } from "./block";
import { PropSchema, TypesMatch } from "./blockTypes";
import { mergeAttributes, Node } from '@tiptap/core'

export const Question = Node.create({
  name: 'question',
  content: 'inline*',
  defining: true,
  addAttributes() {
    return {
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="question"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { style: "font-weight: bold", "data-type": "question" }), 0]
  },
})

export const Option = Node.create({
  name: 'option',
  defining: true,
  content: 'inline*',
  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('data-checked') === 'true',
        renderHTML: attributes => {
          return {
            'data-checked': attributes.checked.value,
          };
        }
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="option"]',
      },
    ]
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { "data-type": "option" }),
      [
        'input', {
          type: "checkbox",
          checked: node.attrs.checked ? 'checked' : null
        },
      ],
      ['div', { style: "margin-left: 5px" }, 0]
    ]
  },
})



export const Mcq = createTipTapBlock<"mcq">({
  name: 'mcq',
  content: 'question option*',
  addAttributes() {
    return {}
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="mcq"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { "data-type": "mcq" }), 0]
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { selection } = this.editor.state;
        if (selection.$from.parent.type.name !== 'option' && selection.$from.parent.type.name !== 'question') {
          return false;
        }
        return this.editor.chain().insertContentAt(this.editor.state.selection.head, {
          type: 'option', content: []
        }).focus().run()
      },
      Backspace: () => {
        const { selection } = this.editor.state;
        if (selection.$from.parent.type.name !== 'option' && selection.$from.parent.type.name !== 'question') {
          return false;
        }

        return this.editor.chain().joinBackward().focus().run();
      },
      'Mod-Enter': () => {
        return this.editor.chain().BNCreateBlock(
          this.editor.state.selection.anchor + 2
        ).setTextSelection(this.editor.state.selection.anchor + 2).run();
      }
    }
  },
})


export const defaultProps = {
  backgroundColor: {
    default: "transparent" as const,
  },
  textColor: {
    default: "black" as const, // TODO
  },
  textAlignment: {
    default: "left" as const,
    values: ["left", "center", "right", "justify"] as const,
  },
} satisfies PropSchema;

export type DefaultProps = typeof defaultProps;

export const defaultBlockSchema = {
  paragraph: {
    propSchema: defaultProps,
    node: ParagraphBlockContent,
  },
  heading: {
    propSchema: {
      ...defaultProps,
      level: { default: "1", values: ["1", "2", "3"] as const },
    },
    node: HeadingBlockContent,
  },
  image: {
    propSchema: {
      ...defaultProps,
      src: { default: "" }
    },
    node: ImageBlockContent,
  },
  bulletListItem: {
    propSchema: defaultProps,
    node: BulletListItemBlockContent,
  },
  numberedListItem: {
    propSchema: {
      ...defaultProps,
      index: { default: null }
    },
    node: NumberedListItemBlockContent,
  },
  mcq: {
    propSchema: defaultProps,
    node: Mcq,
  }
} as const;

export type DefaultBlockSchema = TypesMatch<typeof defaultBlockSchema>;
