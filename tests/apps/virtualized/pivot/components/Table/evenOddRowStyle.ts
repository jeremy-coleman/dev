
export default function evenOddRowStyle({
  rowIndex = 0,
  columnIndex = 0,
  evenRowBackground,
  oddRowBackground,
}) {
  if (rowIndex % 2 === 0) {
    return columnIndex % 2 === 0 ?
      {backgroundColor: evenRowBackground} :
      {backgroundColor: oddRowBackground};
  }

  return columnIndex % 2 !== 0 ?
    {backgroundColor: evenRowBackground} :
    {backgroundColor: oddRowBackground};
}
