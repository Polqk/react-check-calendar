import React from 'react';
import { Menu } from 'antd';

export default () => {
  const [sections, setSections] = React.useState([]);
  React.useEffect(() => {
    const found = Array.from(document.getElementsByTagName('section'));
    if (found.length !== sections.length) {
      setSections(found);
    }
  })

  return (
    <nav>
      <Menu onSelect={(selection) => window.hash = `#${selection.key}`}>
        {sections.map(section => {
          if (!section.id) {
            return null;
          }

          return (
            <Menu.Item
              key={section.id}
              onClick={() => section.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' })}
            >
              {section.id && section.id[0].toUpperCase() + section.id.substr(1).split('-').join(' ')}
            </Menu.Item>
          )
        })}
      </Menu>
    </nav>
  );
}
