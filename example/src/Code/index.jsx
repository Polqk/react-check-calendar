import SyntaxHighlighter  from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React from 'react';

const Code = ({ children, file, language }) => {
  const [text, setText] = React.useState(children);

  return (
    <div>
    {file && <input type="file" src={file} onChange={(e) => setText(e.target.value)} style={{ display: 'none' }} />}
      <SyntaxHighlighter language={language || 'jsx'} style={nord}>
        {text}
      </SyntaxHighlighter>
    </div>
  );
}



export default Code;
