import SelectionArea, { SelectionEvent } from '@viselect/react';
import React, { useState } from 'react';
import './index.css';

type TableDragSelectProps = {
  rows: number;
  cols: number;
  initialValue?: boolean[][];
};

export default function TableDragSelect(props: TableDragSelectProps) {
  const { rows = 7, cols = 24, initialValue } = props;

  const emptyVal: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));

  const initialVal = initialValue ?? emptyVal;

  const [cubes, setCubes] = useState<boolean[][]>(initialVal);

  const getRowColumnIndex = (index: string) => {
    return index.split('-').map(Number);
  };

  const extractKey = (els: Element[]): (string | null)[] =>
    els.map((v) => v.getAttribute('data-key')).filter(Boolean);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setCubes(emptyVal);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setCubes((prev) => {
      const next = prev.map((row) => [...row]);
      extractKey(added).forEach((id) => {
        if (!id) {
          return;
        }
        const [rowIndex, columnIndex] = getRowColumnIndex(id);
        next[rowIndex][columnIndex] = true;
      });
      extractKey(removed).forEach((id) => {
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
          setCubes(emptyVal);
        }}
      >
        clear
      </button>
      <button
        type="button"
        onClick={() => {
          setCubes((selected) => selected.map((rows) => rows.map(() => true)));
        }}
      >
        all
      </button>
      <button
        type="button"
        onClick={() => {
          setCubes(initialVal);
        }}
      >
        reset
      </button>
      <SelectionArea onStart={onStart} onMove={onMove} selectables=".selectable">
        <table>
          <thead>
            <tr>
              {Array.from({ length: cols }, (_, index) => (
                <th key={index}>{`${index + 1}`.padStart(2, '0')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cubes.map((rows, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {rows.map((col, columnIndex) => {
                    return (
                      <td
                        className={
                          cubes[rowIndex][columnIndex] ? 'selected selectable' : 'selectable'
                        }
                        data-key={`${rowIndex}-${columnIndex}`}
                        key={`${rowIndex}-${columnIndex}`}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </SelectionArea>
    </>
  );
}
