"use client";

import { useCallback, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  ImageIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const C = {
  gold: "#c8a96e",
  goldLight: "rgba(200,169,110,0.15)",
  goldBorder: "rgba(200,169,110,0.25)",
  text: "white",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(200,169,110,0.5)",
  surface: "rgba(255,255,255,0.04)",
};

function ToolbarBtn({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 6,
        border: "none",
        background: active ? C.goldLight : "transparent",
        color: active ? C.gold : C.textMuted,
        cursor: "pointer",
        transition: "all 0.15s",
        fontSize: "0.8rem",
        fontWeight: active ? 700 : 500,
      }}
      onMouseEnter={(e) => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background = C.surface;
      }}
      onMouseLeave={(e) => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
      }}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Yangilik matnini yozing...",
  maxLength = 5000,
}: RichTextEditorProps) {
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      ImageExtension.configure({ inline: false }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link" },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: maxLength }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class: "rich-text-editor",
        style: `
          min-height: 300px;
          padding: 16px;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.8;
          color: white;
        `,
      },
    },
  });

  const handleLinkClick = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt(
      "URL manzilini kiriting:",
      previousUrl || "https://",
    );
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const handleImageInsert = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Rasm URL manzilini kiriting:", "https://");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const charCount = editor.storage.characterCount?.characters?.() || 0;
  const isOverLimit = charCount > maxLength;

  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: "8px 10px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(255,255,255,0.03)",
          alignItems: "center",
        }}
      >
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </ToolbarBtn>

        <div
          style={{
            width: 1,
            height: 20,
            background: C.border,
            margin: "0 4px",
          }}
        />

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </ToolbarBtn>

        <div
          style={{
            width: 1,
            height: 20,
            background: C.border,
            margin: "0 4px",
          }}
        />

        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <AlignLeft size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <AlignCenter size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <AlignRight size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
          title="Justify"
        >
          <AlignJustify size={16} />
        </ToolbarBtn>

        <div
          style={{
            width: 1,
            height: 20,
            background: C.border,
            margin: "0 4px",
          }}
        />

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered list"
        >
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          <Minus size={16} />
        </ToolbarBtn>

        <div
          style={{
            width: 1,
            height: 20,
            background: C.border,
            margin: "0 4px",
          }}
        />

        <ToolbarBtn
          onClick={handleLinkClick}
          active={editor.isActive("link")}
          title="Link (Ctrl+K)"
        >
          <LinkIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={handleImageInsert} title="Insert image">
          <ImageIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
          title="Highlight"
        >
          <Highlighter size={16} />
        </ToolbarBtn>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Character count */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "6px 14px",
          borderTop: `1px solid ${C.border}`,
          color: isOverLimit ? "#ef4444" : C.textDim,
          fontSize: "0.72rem",
        }}
      >
        {charCount} / {maxLength} ta belgi
      </div>

      <style>{`
        .rich-text-editor h1 { font-size: 1.8rem; font-weight: 800; margin: 0.5em 0 0.3em; color: white; }
        .rich-text-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 0.5em 0 0.3em; color: white; }
        .rich-text-editor h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; color: white; }
        .rich-text-editor p { margin: 0.5em 0; }
        .rich-text-editor blockquote {
          border-left: 3px solid ${C.gold};
          padding-left: 16px;
          margin: 0.8em 0;
          color: rgba(255,255,255,0.7);
          font-style: italic;
        }
        .rich-text-editor ul, .rich-text-editor ol { padding-left: 24px; margin: 0.5em 0; }
        .rich-text-editor li { margin: 0.2em 0; }
        .rich-text-editor pre {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: monospace;
          font-size: 0.85rem;
          color: ${C.gold};
          overflow-x: auto;
        }
        .rich-text-editor code {
          background: rgba(255,255,255,0.08);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85em;
        }
        .rich-text-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        .rich-text-editor a { color: ${C.gold}; text-decoration: underline; }
        .rich-text-editor mark {
          background: #fef08a;
          color: #1a1f2e;
          padding: 0 4px;
          border-radius: 3px;
        }
        .rich-text-editor hr {
          border: none;
          border-top: 1px solid ${C.border};
          margin: 1.5em 0;
        }
        .rich-text-editor p.is-editor-empty:first-child::before {
          color: ${C.textDim};
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
