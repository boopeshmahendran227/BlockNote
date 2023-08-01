// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { BlockNoteView, ReactSlashMenuItem, defaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import styles from "./App.module.css";
import { BiSelectMultiple } from "react-icons/bi";
import { BlockNoteEditor, PartialBlock, Block } from "@blocknote/core";



type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

const insertMcq = (editor: BlockNoteEditor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  const mcqBlock: PartialBlock = {
    type: "mcq",
  };

  editor.insertBlocks([mcqBlock], currentBlock, "after");
  editor.setTextCursorPosition(currentBlock, "start");
}

const insertImage = (editor: BlockNoteEditor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  const imageBlock: PartialBlock = {
    type: "image",
  };

  editor.insertBlocks([imageBlock], currentBlock, "after");
  editor.setTextCursorPosition(currentBlock, "start");
}

const mcqMenuItem = new ReactSlashMenuItem("Insert MCQ",
  insertMcq,
  [],
  "Questions",
  <BiSelectMultiple size={18} />,
);

const imageMenuItem = new ReactSlashMenuItem("Insert Image",
  insertImage,
  [],
  "Media",
  <BiSelectMultiple size={18} />,
)

function App() {
  const editor = useBlockNote({
    slashCommands: [...defaultReactSlashMenuItems, mcqMenuItem, imageMenuItem],
    onEditorContentChange: (editor: BlockNoteEditor) => {
      console.log(editor.topLevelBlocks);
    },
    editorDOMAttributes: {
      class: styles.editor,
    },
    theme: "light",
    initialContent: [{ "id": "e1519f64-e2bd-4232-bb87-fed69b3e4cfb", "type": "heading", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left", "level": "1" }, "content": [{ "type": "text", "text": "This is a heading", "styles": {} }], "children": [] }, { "id": "47a1b6c8-e5e1-4946-af4d-c2bfa94bcc99", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Orange text", "styles": { "textColor": "orange" } }], "children": [] }, { "id": "d2eb8649-d5a9-4e97-93e8-51cc3bd42ae0", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "74e65845-f370-47bc-9dbc-591ac54ec3ba", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Lorem ", "styles": {} }, { "type": "text", "text": "ipsum", "styles": { "bold": true } }, { "type": "text", "text": " dolor sit amet, consectetur adipiscing elit. In dignissim ullamcorper magna, eu pulvinar enim gravida sit amet. Donec sed augue vel massa aliquam vulputate. Nulla et nunc arcu. Aliquam in orci dictum, sagittis turpis congue, bibendum mauris. Vivamus interdum laoreet eros ut lacinia. Integer imperdiet odio enim, et maximus dolor ", "styles": {} }, { "type": "text", "text": "mattis", "styles": { "underline": true } }, { "type": "text", "text": " sit amet. Ut ligula erat, egestas rhoncus leo a, sagittis ultrices orci. Vestibulum vulputate posuere ornare. Nulla scelerisque finibus enim, vitae aliquam lectus suscipit nec. In ", "styles": {} }, { "type": "text", "text": "volutpat", "styles": { "strike": true } }, { "type": "text", "text": " maximus tortor at suscipit.", "styles": {} }], "children": [] }, { "id": "82c6036e-844a-413a-98c3-2e0dd283b7f7", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "f139e242-c08d-4e85-8aaa-f089e1d9f02b", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Text with background color.", "styles": { "backgroundColor": "red" } }], "children": [] }, { "id": "11d1823a-f088-4820-971a-022c28949307", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "ffb1e4da-14e3-4462-8ea9-e677692d327c", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "link", "href": "https://skill-lync.com", "content": [{ "type": "text", "text": "skill-lync", "styles": {} }] }], "children": [] }, { "id": "a6a357f0-32e2-4a0e-8053-4d1c5217aadb", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "2d5953d1-9b64-4f24-98f4-ddc17a5bb0ec", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "one", "styles": {} }], "children": [] }, { "id": "2bdea1bf-78ab-458c-8d45-dd99112b5833", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "two", "styles": {} }], "children": [] }, { "id": "2ddfc98a-a9c9-4807-b4f5-7eb249f467ad", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "three", "styles": {} }], "children": [] }, { "id": "916b163d-ccfd-4265-8b00-f2bab7d99d95", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "9fb5630b-30c4-4692-964d-b7d9d79dd33d", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "4bf88eac-0295-46d0-a1d5-e7bbc3ccd66c", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "36193270-1740-49be-9e61-fdd9dcc2ce1b", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "a2e99632-f224-4027-8b31-414cd05738d9", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] },
    { "id": "a2e99632-f224-4027-8b31-414cd05738q9", "type": "image", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left", "src": "" }, "content": [], "children": [] }]

  });

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
