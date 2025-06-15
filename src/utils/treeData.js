

export function buildArchiveTree(archiveId, tomeNames) {
  // Mantine Tree expects an array where each item has unique `value`, a `label`
  // and (optionally) `children`. For our sidebar we keep a single root node –
  // the archive name – and list every tome underneath it.
  return [
    {
      value: archiveId,
      label: archiveId,
      children: tomeNames.map((name) => ({
        value: `${archiveId}/${name}`,
        label: name,
      })),
    },
  ];
} 