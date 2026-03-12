'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(() => import('../components/Editor/Editor').then(mod => mod.RichTextEditor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function EditorPage() {
    const [value, setValue] = useState("");
    console.log("editor file loaded");

  return (
    <div className="max-w mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Tode AI</h1>
      <Editor 
      name="Tode-AI"
      value={value}
      onChange={(newValue) => setValue(newValue)} />
      <button type="button">Save</button>
    </div>
  );
}
