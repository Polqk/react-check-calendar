import SyntaxHighlighter  from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React from 'react';
import { message } from 'antd';

const successMessage = () => message.success('Code copied to clipboard');

const Code = ({ children, text, language, title }) => {
  const lang = language || 'jsx';
  const code = (text || children);
  const inputRef = React.createRef();

  const _handleCopy = () => {
    if ( navigator.clipboard ) {
      navigator.clipboard.writeText(code).then(function() {
        successMessage();
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });

      return;
    }

    const input = inputRef.current;
    if (!input) {
      return;
    }

    input.focus();
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');

    successMessage();
  };

  return (
    <div className="code">
      {title && <h4>{title}</h4>}
      <div className="actions">
        <button className="lang">{ lang }</button>
        <button className="copy" onClick={ _handleCopy}>Copy</button>
      </div>
      <input ref={inputRef} type="text" value={code} onChange={() => false} style={{ display: 'none' }} />
        <SyntaxHighlighter language={lang} style={nord}>
          { code}
        </SyntaxHighlighter>
      </div>
  );
}



export default Code;
