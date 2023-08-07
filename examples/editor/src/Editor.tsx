// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { BlockNoteView, ReactSlashMenuItem, defaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import { BiSelectMultiple } from "react-icons/bi";
import { BlockNoteEditor, PartialBlock, defaultBlockSchema } from "@blocknote/core";
import { ImageBlock, VideoBlock } from "@blocknote/react"
import { useEffect } from "react";
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

const insertVideo = (editor: BlockNoteEditor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  const imageBlock: PartialBlock = {
    type: "video",
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

const videoMenuItem = new ReactSlashMenuItem("Insert Video",
  insertVideo,
  [],
  "Media",
  <BiSelectMultiple size={18} />,
)

function Editor({ editable, initialContent }: { editable: boolean, initialContent: PartialBlock<any>[] }) {
  const editor = useBlockNote({
    editable: editable,
    slashCommands: [...defaultReactSlashMenuItems, mcqMenuItem, imageMenuItem, videoMenuItem],
    onEditorContentChange: (editor: BlockNoteEditor) => {
    },
    editorDOMAttributes: {
      class: "editor"
    },
    theme: "light",
    initialContent: initialContent,
    blockSchema: {
      ...defaultBlockSchema,
      image: ImageBlock,
      video: VideoBlock
    }
  });

  useEffect(() => {
    if (!editable || !editor) {
      return;
    }
    const i = setInterval(() => {
      localStorage.setItem('content', JSON.stringify(editor.topLevelBlocks));
    }, 1000);
    return () => clearInterval(i);
  }, [editable, editor]);


  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />
}

export default Editor;
