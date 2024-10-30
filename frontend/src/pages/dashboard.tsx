import Header from "../components/layout/Header";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Table from "../components/ui/Table";
import { AppContext } from "../context/appContext";
import { Title } from "../types/title";
import formatDate from "../utils/formatDate";
import { addTitle, getAllTitles } from "../utils/services";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

export default function () {
    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState<Title[]>([]);
    const { isWalletConnected } = useContext(AppContext);
    const columns = useMemo(() => [
        {
            dataIndex: 'title',
            title: 'Title',
        },
        {
            dataIndex: 'createdAt',
            title: 'Created Date',
            renderer: ({item}: {item: Title}) => <span>{formatDate(item.createdAt)}</span>
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
        setTitles(prev => [...prev, { title, createdAt: new Date().toDateString() }]);
    }

    return (
        <div>
            <Header />
            <div className="relative flex-grow mb-4">
                <Input
                    type="text"
                    placeholder="Input here"
                    className="w-full pr-20 rounded-full"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                    type="submit"
                    className="absolute right-0 top-0 bottom-0 rounded-r-[15px] rounded-l-none"
                    onClick={submitTitle}
                    disabled={!isWalletConnected}
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