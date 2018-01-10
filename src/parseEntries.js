export default function(opts) {
  const { classes, nodes } = opts || {};
  let entries = [];

  if (!classes && !nodes) return entries;

  const nextClasses = classes ? [].concat(classes) : [];
  const nextNodes = nodes ? [].concat(nodes) : [];

  const nodesByClass = (cls) => document.getElementsByClassName(cls);

  if (nextClasses.length > 0) {
    nextClasses.forEach((cls) => {
      entries = entries.concat(Array.from(nodesByClass(cls)))
    });
  }

  if (nextNodes.length > 0) {
    entries = entries.concat(nextNodes);
  }

  return entries;
}
