import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck, FiExternalLink} from "react-icons/fi";


const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#0d0d0d] shadow-md">
      <div className="flex items-center justify-between bg-[#282c34] px-4 py-2 border-b border-zinc-800">
        <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">{language || "code"}</span>
        <button onClick={onCopy} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all">
          {copied ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0, padding: "1.25rem", fontSize: "13.5px", background: "transparent", lineHeight: "1.6" }}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export const MarkdownResponse = ({ content }) => {
  return (
    <div className="w-full max-w-none text-[16px] selection:bg-blue-500/20 antialiased">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Paragraph: Strong structure, NO italics by default
          p: ({ children }) => (
            <p className="text-zinc-800 dark:text-zinc-200 leading-[1.8] mb-6 last:mb-0 font-normal">
              {children}
            </p>
          ),

          // Headings: Sharp and clean
          h1: ({ children }) => <h1 className="text-2xl font-bold text-black dark:text-white mb-6 mt-10 first:mt-0 tracking-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold text-black dark:text-white mb-5 mt-8 tracking-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold text-black dark:text-white mb-4 mt-6 tracking-tight">{children}</h3>,

          // Fancy Table: Headers are Left Aligned
          table: ({ children }) => (
            // IS DIV PAR w-full ADD KARNA HAI
            <div className="w-full my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full border-collapse text-sm text-left">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 font-semibold border-b border-zinc-200 dark:border-zinc-800">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50">{children}</td>,

          thead: ({ children }) => (
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-5 py-4 font-bold text-zinc-900 dark:text-zinc-100 text-left border-r border-zinc-100 dark:border-zinc-800 last:border-r-0 text-[14px] bg-zinc-50/50 dark:bg-zinc-900/50">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 align-middle last:border-b-0 border-r border-zinc-100 dark:border-zinc-800/50 last:border-r-0 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-colors">
              {children}
            </td>
          ),

          // Emphasis: Italics restricted to Notation/Em only when explicitly asked
          em: ({ children }) => <em className="italic text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-1 rounded">{children}</em>,
          
          // Quotes: Elegant notation style
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 pl-6 py-3 my-6 italic text-zinc-600 dark:text-zinc-400 rounded-r-lg shadow-sm">
              {children}
            </blockquote>
          ),

          // Strong text
          strong: ({ children }) => <strong className="font-bold text-black dark:text-white">{children}</strong>,

          // Inline Code
          code({ inline, className, children }) {
            if (inline) {
              return (
                <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[13.5px] font-mono text-[#e06c75] font-medium border border-zinc-200 dark:border-zinc-700">
                  {children}
                </code>
              );
            }
            return <CodeBlock language={className?.replace("language-", "")} value={String(children).replace(/\n$/, "")} />;
          },

          // Lists
          ul: ({ children }) => <ul className="list-disc pl-8 mb-6 space-y-3 text-zinc-800 dark:text-zinc-200">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-8 mb-6 space-y-3 text-zinc-800 dark:text-zinc-200">{children}</ol>,
          li: ({ children }) => <li className="leading-[1.7] pl-1">{children}</li>,

          // Links
          a: ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline underline-offset-4 decoration-2 transition-all"
  >
    {children}
    <FiExternalLink className="w-3 h-3 shrink-0" />
  </a>
),
          

          hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
          img: () => null,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};