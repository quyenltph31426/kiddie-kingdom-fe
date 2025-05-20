'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface StreamTextProps {
  content: string;
  isComplete?: boolean;
  className?: string;
  speed?: number;
  htmlMode?: boolean;
}

const StreamText: React.FC<StreamTextProps> = ({ content, isComplete = false, className = '', speed = 10, htmlMode = false }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    // Reset state when content changes
    if (!isComplete && isStreaming) {
      setDisplayedContent('');
    }

    if (isComplete || !isStreaming) {
      setDisplayedContent(content);
      return;
    }

    // Check if content contains code blocks or complex formatting
    const hasCodeBlocks = content.includes('```') || content.includes('`');
    const hasComplexHtml = content.includes('<pre') || content.includes('<code');

    // If content has code blocks or complex HTML, don't stream it
    if (hasCodeBlocks || hasComplexHtml) {
      setDisplayedContent(content);
      setIsStreaming(false);
      return;
    }

    // Simple character-by-character streaming for regular text
    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, isComplete, isStreaming, speed, htmlMode]);

  // Sanitize HTML content
  const sanitizedContent = DOMPurify.sanitize(displayedContent);

  return (
    <div className={className}>
      {htmlMode ? <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> : displayedContent}
      {isStreaming && <span className="animate-pulse">▌</span>}
    </div>
  );
};

export default StreamText;
