import { visit } from 'unist-util-visit';

const ADMONITION_TYPES = {
  note: { title: 'Note' },
  tip: { title: 'Tip' },
  info: { title: 'Info' },
  warning: { title: 'Warning' },
  danger: { title: 'Danger' },
  caution: { title: 'Caution' },
};

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;

      const type = ADMONITION_TYPES[node.name];
      if (!type) return;

      if (!node.data) {
        node.data = {};
      }
      const data = node.data;

      // Check if first child is a directiveLabel (custom title)
      let title = type.title;
      if (node.children.length > 0 && node.children[0].data?.directiveLabel) {
        title = node.children
          .shift()
          .children.map((c) => c.value || '')
          .join('');
      }

      data.hName = 'aside';
      data.hProperties = {
        class: `admonition admonition-${node.name}`,
        role: 'note',
      };

      // Prepend title element
      node.children.unshift({
        type: 'paragraph',
        data: {
          hName: 'div',
          hProperties: { class: 'admonition-title' },
        },
        children: [{ type: 'text', value: title }],
      });
    });
  };
}
