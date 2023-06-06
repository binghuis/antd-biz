import SelectionArea, { SelectionEvent } from '@viselect/react';
import React, { useState } from 'react';
import './index.css';

type TableDragSelectProps = {
  rows: number;
  cols: number;
  initialValue?: boolean[][];
};

export default function TableDragSelect(props: TableDragSelectProps) {
  const { rows = 6, cols = 8, initialValue } = props;
  const emptyVal: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
  const initialVal = initialValue ?? emptyVal;
  const [selected, setSelected] = useState<boolean[][]>(initialVal);

  const getRowColumnIndex = (index: string) => {
    return index.split('-').map(Number);
  };

  const extractIds = (els: Element[]): (string | null)[] =>
    els.map((v) => v.getAttribute('data-key')).filter(Boolean);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(emptyVal);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = prev.map((row) => [...row]);
      extractIds(added).forEach((id) => {
        if (!id) {
          return;
        }
        const [rowIndex, columnIndex] = getRowColumnIndex(id);
        next[rowIndex][columnIndex] = true;
      });
      extractIds(removed).forEach((id) => {
        if (!id) {
          return;
        }
        const [rowIndex, columnIndex] = getRowColumnIndex(id);
        next[rowIndex][columnIndex] = false;
      });
      return next;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSelected(emptyVal);
        }}
      >
        clear
      </button>
      <button
        type="button"
        onClick={() => {
          setSelected((selected) => selected.map((rows) => rows.map(() => true)));
        }}
      >
        all
      </button>
      <button
        type="button"
        onClick={() => {
          setSelected(initialVal);
        }}
      >
        reset
      </button>
      <SelectionArea
        className="container"
        onStart={onStart}
        onMove={onMove}
        selectables=".selectable"
      >
        <table>
          {selected.map((rows, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {rows.map((col, columnIndex) => {
                  return (
                    <td
                      className={
                        selected[rowIndex][columnIndex] ? 'selected selectable' : 'selectable'
                      }
                      data-key={`${rowIndex}-${columnIndex}`}
                      key={`${rowIndex}-${columnIndex}`}
                    />
                  );
                })}
              </tr>
            );
          })}
        </table>
      </SelectionArea>
    </>
  );
}
