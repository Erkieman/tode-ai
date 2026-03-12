import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ToolbarPlugin } from "./Plugins";
import { EditorThemeClasses } from "lexical";
import CustomOnChangePlugin from "../Editor/Plugins/CustomOnChangePlugin";

const theme: EditorThemeClasses = {
  text: {
    bold: "font-bold",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    italic: "italic",
    code: "text-black p-0.5 bg-gray-100 border border-gray-300 rounded",
  },
  heading: {
    h1: 'editor-h1',
    h2: 'editor-h2',
    h3: 'editor-h3',
    h4: 'editor-h4',
    h5: 'editor-h5',
    h6: 'editor-h6',
  },
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ value, onChange, placeholder, name }) {
    const initialConfig = useMemo(
      () => ({
        namespace: name,
        theme,
        onError: () => {},
        nodes: [HeadingNode, CodeHighlightNode, CodeNode],
      }),
      [name]
    );

    return (
      <div>
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="h-[120px] text-xs p-2 overflow-auto outline-none border border-black rounded"
                />
              }
              placeholder={
                <div className="absolute top-2 left-2.5 text-xs text-gray-400">
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <AutoFocusPlugin />
          <HistoryPlugin />
          <CustomOnChangePlugin value={value} onChange={onChange} />
        </LexicalComposer>
      </div>
    );
  }
);