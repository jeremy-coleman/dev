function ownerDocument(node) {
  return (node && node.ownerDocument) || document;
}


function ownerWindow(node, fallback = window) {
  const doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
}

export { ownerWindow , ownerDocument}