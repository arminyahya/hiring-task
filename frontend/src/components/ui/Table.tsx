import React, { memo, useRef } from 'react';
import useVerticalScrollbarMeasure from '../../hooks/useVerticalScrollbarMeasure';
import useAutoSizer from '../../hooks/useAutoSizer';

export interface ColumnType {
    dataIndex: string;
    title: string;
    renderer?: ({ item }: { item: any }) => React.ReactNode;
}

interface Props {
    data: any[];
    columns: ColumnType[];
    className?: string;
}

function Table(props: Props) {
    const { columns, data, className } = props;
    const listRef = useRef<HTMLDivElement>(null);
    const [scrolbarWidth] = useVerticalScrollbarMeasure({ listRef });
    const { height, width } = useAutoSizer({ listRef });

    return (
        <div className={"w-full h-full flex-1 overflow-x-auto bg-white " + className}>
            <div className='bg-white overflow-hidden h-[40px]'>
                <table className="w-full h-full">
                    <thead className="bg-gray-100">
                        <tr className='flex w-full h-full'>
                            {columns.map((col, index) => (
                                <th key={index} className="flex-1 py-2 px-4 border-b text-left font-medium">{col.title}</th>
                            ))}
                            <th style={{ width: scrolbarWidth }}></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={`overflow-y-auto`} style={{ height: height - 40, width }} ref={listRef}>
                <table className="bg-white h-full w-full overflow-hidden">
                    <tbody>
                        {
                            data.map((d, index) => (
                                <tr key={index} className='flex w-full'>
                                    {columns.map((col, index) => (
                                        <td key={index} className="flex-1 py-2 px-4 border-b text-left truncate">{col.renderer ? col.renderer({ item: d }) : d[col.dataIndex] as string}</td>

                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Table);