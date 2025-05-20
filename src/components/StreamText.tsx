'use client';

import React, { useEffect, useState } from 'react';

interface StreamTextProps {
  content: string;
  isComplete?: boolean;
  className?: string;
  speed?: number;
}

const StreamText: React.FC<StreamTextProps> = ({ content, isComplete = false, className = '', speed = 10 }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (isComplete || !isStreaming) {
      setDisplayedContent(content);
      return;
    }

    let index = 0;
    const contentWithoutHtml = content.replace(/<[^>]*>/g, '');

    // If content contains HTML, don't stream it
    if (content !== contentWithoutHtml) {
      setDisplayedContent(content);
      setIsStreaming(false);
      return;
    }

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
  }, [content, isComplete, isStreaming, speed]);

  // Handle HTML content
  if (content.includes('<')) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className={className}>
      {displayedContent}
      {isStreaming && <span className="animate-pulse">▌</span>}
    </div>
  );
};

export default StreamText;
