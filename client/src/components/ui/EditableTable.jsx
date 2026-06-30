import Button from "./Button";

function buildGridTemplate(columns) {
  return columns
    .map((col) => {
      const width = col.width || "1fr";
      if (width.endsWith("px")) return `minmax(${width}, ${width})`;
      return width;
    })
    .join(" ");
}

function TableHeader({ columns, gridStyle, tableWidthClass }) {
  return (
    <div
      className={`grid items-center gap-2 border-b border-cms-divider bg-cms-tablehead px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint sm:gap-3 sm:px-4 ${tableWidthClass}`}
      style={gridStyle}>
      {columns.map((col) => (
        <div key={col.key} className={`whitespace-nowrap ${col.headerClassName || ""}`}>
          {col.header}
        </div>
      ))}
    </div>
  );
}

function TableRows({ columns, rows, onChangeCell, onDelete, gridStyle, tableWidthClass }) {
  return rows.map((row) => (
    <div key={row.id} className={`grid items-start gap-2 border-b border-cms-divider px-3 py-2.5 transition-colors hover:bg-cms-bg/35 sm:gap-3 sm:px-4 ${tableWidthClass}`} style={gridStyle}>
      {columns.map((col) => (
        <div key={col.key} className={`min-w-0 ${col.cellClassName || ""}`}>
          {col.render(row, onChangeCell, onDelete)}
        </div>
      ))}
    </div>
  ));
}

function TableFooter({ onAddRow, addLabel, tableWidthClass }) {
  if (!onAddRow) return null;

  return (
    <div className={`px-4 py-3 ${tableWidthClass}`}>
      <Button variant="ghost" size="sm" onClick={onAddRow} className="font-mono text-xs">
        + {addLabel}
      </Button>
    </div>
  );
}

export default function EditableTable({ columns, rows, onChangeCell, onDelete, onAddRow, addLabel, className = "", scrollable = false }) {
  const gridTemplate = buildGridTemplate(columns);
  const gridStyle = { gridTemplateColumns: gridTemplate };
  const tableWidthClass = scrollable ? "w-max min-w-full" : "";

  if (scrollable) {
    return (
      <div className={`overflow-hidden rounded-cmscard border border-cms-cardborder bg-cms-surface ${className}`}>
        <div className="scrollbar-hide overflow-x-auto">
          <div className={tableWidthClass}>
            <TableHeader columns={columns} gridStyle={gridStyle} tableWidthClass={tableWidthClass} />
            <TableRows columns={columns} rows={rows} onChangeCell={onChangeCell} onDelete={onDelete} gridStyle={gridStyle} tableWidthClass={tableWidthClass} />
            <TableFooter onAddRow={onAddRow} addLabel={addLabel} tableWidthClass={tableWidthClass} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-cmscard border border-cms-cardborder bg-cms-surface ${className}`}>
      <TableHeader columns={columns} gridStyle={gridStyle} tableWidthClass={tableWidthClass} />
      <TableRows columns={columns} rows={rows} onChangeCell={onChangeCell} onDelete={onDelete} gridStyle={gridStyle} tableWidthClass={tableWidthClass} />
      <TableFooter onAddRow={onAddRow} addLabel={addLabel} tableWidthClass={tableWidthClass} />
    </div>
  );
}
