const FM_UTILITIES = ['nopadding', 'no-upper', 'font-felt', 'pos-rlt', 'pos-stc', 'pos-abt', 'line', 'line-s', 'line-xs', 'line-lg', 'line-dashed', 'no-line', 'no-radius', 'block', 'inline', 'none', 'pull-left', 'pull-right-lg', 'pull-none', 'rounded', 'l-n', 'v-middle', 'v-top', 'v-bottom', 'font-normal', 'font-thin', 'font-sbold', 'font-bold', 'font-ebold', 'text-xl', 'text-lg', 'text-md', 'text-sm', 'text-xs', 'text-base', 'text-ellipsis', 'text-l-t', 'text-c', 'text-italic', 'text-left', 'text-center', 'text-right', 'box-shadow', 'cover', 'break-word', 'wrapper-xxs', 'wrapper-sm', 'wrapper', 'wrapper-md', 'wrapper-lg', 'wrapper-xl', 'padder', 'padder-icon', 'padder-v', 'no-padder', 'pull-in', 'pull-out', 'b', 'b-a', 'b-t', 'b-r', 'b-b', 'b-l', 'b-light', 'b-dark', 'b-primary', 'b-success', 'b-info', 'b-warning', 'b-danger', 'b-black', 'b-white', 'b-dashed', 'no-b', 'r', 'r-l', 'r-r', 'r-t', 'r-b', 'r-n', 'p-xs', 'p-s', 'p-lg', 'p-l', 'p-h-xs', 'p-h-s', 'p-h-l', 'p-h-lg', 'm-xxs', 'm-xs', 'm-sm', 'm', 'm-md', 'm-lg', 'm-xl', 'm-n', 'm-l-none', 'm-l-xs', 'm-l-sm', 'm-l', 'm-l-md', 'm-l-lg', 'm-l-xl', 'm-l-n-xxs', 'm-l-n-xs', 'm-l-n-sm', 'm-l-n', 'm-l-n-md', 'm-l-n-lg', 'm-l-n-xl', 'm-t-none', 'm-t-xxs', 'm-t-xs', 'm-t-sm', 'm-t', 'm-t-md', 'm-t-lg', 'm-t-xl', 'm-t-n-xxs', 'm-t-n-xs', 'm-t-n-sm', 'm-t-n', 'm-t-n-md', 'm-t-n-lg', 'm-t-n-xl', 'm-r-none', 'm-r-xxs', 'm-r-xs', 'm-r-sm', 'm-r', 'm-r-md', 'm-r-lg', 'm-r-xl', 'm-r-n-xxs', 'm-r-n-xs', 'm-r-n-sm', 'm-r-n', 'm-r-n-md', 'm-r-n-lg', 'm-r-n-xl', 'm-b-none', 'm-b-xxs', 'm-b-xs', 'm-b-sm', 'm-b', 'm-b-md', 'm-b-lg', 'm-b-xl', 'm-b-n-xxs', 'm-b-n-xs', 'm-b-n-sm', 'm-b-n', 'm-b-n-md', 'm-b-n-lg', 'm-b-n-xl', 'm-h-none', 'm-h-xs', 'm-h-sm', 'm-h', 'm-h-md', 'm-h-lg', 'm-h-xl', 'media-xs', 'media-sm', 'media-md', 'media-lg', 'thumb-lg', 'thumb-md', 'thumb', 'thumb-sm', 'thumb-xs', 'thumb-wrapper', 'img-full', 'fa-img', 'fa-stack-inside', 'fa-stack-outside', 'clear', 'scroll-y', 'scroll-x', 'no-touch', 'exponent', 'help-cursor', 'flex-center', 'pointer'];

module.exports = {
  "meta": {
    "type": "problem",
    "docs": {
      "description": "Do not use utilities helper classes."
    },
    "messages": {
      "no-utilities": "You should not use utilities classes. Component styles must be written in a per-component SCSS file."
    },
    "schema": []
  },
  "create": (context) => {
    return {
      JSXOpeningElement: (node) => {
        const className = node.attributes.find((attr) => attr.name && attr.name.name === 'className');
        if (className && className.value && className.value.value) {
          if (FM_UTILITIES.some(uClass => className.value.value.split(' ').includes(uClass))) {
            context.report({
              node: className.value,
              messageId: "no-utilities",
              loc: className.value.loc
            });
          }
        }
      }
    }
  }
};

