'use client';

import MetaMaskConnector from "@/app/_components/feature/MetaMaskConnector";
import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import Table from "@/app/_components/ui/Table";
import { Title } from "@/app/_types/title";
import { addTitle, getAllTitles } from "@/app/_utils/services";
import { useEffect, useMemo, useRef, useState } from "react";

export default function () {
    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState<Title[]>([]);
    const columns = useMemo(() => [
        {
            dataIndex: 'title',
            title: 'title',
        },
        {
            dataIndex: 'createdAt',
            title: 'createdAt',
        }
    ], []);

    useEffect(() => {
        (async () => {
            const result = await getAllTitles();
            setTitles(result.data)
        })()
    }, []);

    const submitTitle = async () => {
        await addTitle(title);
        setTitles(prev => [...prev, {title, createdAt: new Date().toDateString()}]);
    }

    return (
        <div>
            <MetaMaskConnector />
            <div className="relative flex-grow">
                <Input
                    type="text"
                    placeholder="Input here"
                    className="w-full pr-20 rounded-[15px]"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                    type="submit"
                    className="absolute right-0 top-0 bottom-0 rounded-r-[15px] rounded-l-none"
                    onClick={submitTitle}
                >
                    Add
                </Button>
            </div>
            <div className="w-full h-64">
                <Table columns={columns} data={titles} />
            </div>
        </div>
    )
}