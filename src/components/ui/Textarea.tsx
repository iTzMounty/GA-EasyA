import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  return <textarea className="w-full px-3 py-2 border rounded-md" {...props} />;
};

export default Textarea;
