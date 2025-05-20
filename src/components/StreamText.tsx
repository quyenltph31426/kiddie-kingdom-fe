'use client';

import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';

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

    // If complete or not streaming, show full content immediately
    if (isComplete || !isStreaming) {
      setDisplayedContent(content);
      return;
    }

    // Always check for HTML content
    const hasHtml = /<[a-z][\s\S]*>/i.test(content) || content.includes('&lt;') || content.includes('&gt;') || htmlMode;

    // If content has HTML or htmlMode is true, don't stream it
    if (hasHtml) {
      setDisplayedContent(content);
      setIsStreaming(false);
      return;
    }

    // For plain text, do character-by-character streaming
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
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      {isStreaming && <span className="animate-pulse">▌</span>}
    </div>
  );
};

export default StreamText;
