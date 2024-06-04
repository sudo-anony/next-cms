import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Chip } from '@mui/material';
import * as EXAMCRUD from "../redux/EXAMCRUD";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/ExamRedux';
import { useRouter } from 'next/router';
import { ClassifiedData } from '../models/models'
dayjs.extend(relativeTime);

interface Column {
    id: 'title' | 'token' | 'startDate' | 'expireDate' | 'accuracy' | 'questionsCount' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'title', label: 'Exam Title', minWidth: 200 },
    { id: 'token', label: 'Token', minWidth: 150 },
    { id: 'startDate', label: 'Assigned On', minWidth: 200 },
    { id: 'expireDate', label: 'Expire at', minWidth: 200 },
    { id: 'accuracy', label: 'Accuracy', minWidth: 120, align: 'right' },
    { id: 'questionsCount', label: 'Total Questions', minWidth: 150, align: 'right' },
    { id: 'status', label: 'Status', minWidth: 120 },
];


const createData = (
    title: string,
    type: string,
    token: string,
    startDate: string,
    expireDate: string,
    accuracy: number | null,
    questionsCount: string,
    status: string
): ClassifiedData => {
    return { title, type, token, startDate, expireDate, accuracy, questionsCount, status, showToken: false };
};

const fetchData = async (page: number, rowsPerPage: number): Promise<{ data: ClassifiedData[], totalCount: number }> => {
    const response = await EXAMCRUD.fetchUserClassfiedExams(page * rowsPerPage, rowsPerPage);
    const dataPromises = response.data.map(async (item: any) => {
        const quiz = await EXAMCRUD.fetchQuizByExamId(item.id);
        return createData(item.title, item.exam_type, item.token, quiz.start_date, quiz.expire_date, item.accuracy, item.questions_count, item.status);
    });
    const data = await Promise.all(dataPromises);
    return { data, totalCount: response.total_count };
};


export default function AllConfidentialExams() {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState<ClassifiedData[]>([]);
    const [totalCount, setTotalCount] = React.useState(0);

    const fetchPageData = React.useCallback(async () => {
        const { data, totalCount } = await fetchData(page, rowsPerPage);
        setData(data);
        setTotalCount(totalCount);
    }, [page, rowsPerPage]);

    React.useEffect(() => {
        fetchPageData();
    }, [fetchPageData]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                return prevData.map(row => {
                    if (row.expireDate) {
                        return {
                            ...row,
                            remainingTime: getRemainingTime(row.expireDate)
                        };
                    }
                    return row;
                });
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleToggleToken = (index: number) => {
        setData(prevData => {
            const newData = prevData.slice();
            newData[index] = { ...newData[index], showToken: !newData[index].showToken };
            return newData;
        });
    };

    const getRemainingTime = React.useCallback((expireDate: string) => {
        const now = dayjs();
        const expiry = dayjs(expireDate);
        const diffInSeconds = expiry.diff(now, 'second');

        if (diffInSeconds > 0) {
            const days = Math.floor(diffInSeconds / (3600 * 24));
            const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((diffInSeconds % 3600) / 60);
            const seconds = diffInSeconds % 60;

            let remainingTime = "";
            if (days > 0) {
                remainingTime += `${days} days `;
            }
            if (hours > 0) {
                remainingTime += `${hours} hours `;
            }
            if (minutes > 0) {
                remainingTime += `${minutes} mins `;
            }
            if (seconds > 0) {
                remainingTime += `${seconds} secs`;
            }

            return remainingTime.trim();
        }

        return "Expired";
    }, []);

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const handleStartClick = async (row: ClassifiedData) => {
        dispatch(actions.clearExam());
        const response = await EXAMCRUD.startExam(row.token);
        const { exam, quiz, questions } = response.data;
        const completeExam = { exam, quiz, questions };
        dispatch(actions.setExam(completeExam));
        navigate.push(`/exam-attemption/quick-exam/${completeExam.exam.token}`);
    };

    const memoizedRemainingTime = React.useMemo(() => getRemainingTime, [getRemainingTime]);


    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440, borderRadius: "5px" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={columns.length} sx={{ backgroundColor: '#f1416c' }}>
                                    <h5 className="text-light">Classified Exams</h5>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 10, minWidth: column.minWidth, fontWeight: 'bold' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.token}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'token') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span>{row.showToken ? value : '******'}</span>
                                                        <IconButton onClick={() => handleToggleToken(index)} size="small" style={{ marginLeft: 8 }}>
                                                            {row.showToken ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            );
                                        } else if (column.id === 'status') {
                                            let chipColor: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
                                            if (value === 'review') {
                                                chipColor = 'success';
                                            } else if (value === 'start') {
                                                chipColor = 'info';
                                            } else {
                                                chipColor = 'error';
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Chip color={chipColor} onClick={() => handleStartClick(row)} label={typeof value === 'string' ? capitalizeFirstLetter(value) : ''} />
                                                </TableCell>

                                            );
                                        } else if (column.id === 'accuracy') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value !== null && value !== undefined ? value : 'NA'}
                                                </TableCell>

                                            );
                                        } else if (column.id === 'expireDate') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {memoizedRemainingTime(value as string)}
                                                </TableCell>
                                            );
                                        } else if (column.id == "startDate") {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'startDate' ? dayjs(value).format('MMMM DD, YYYY - HH:mm:ss') :
                                                        (value !== null && value !== undefined ? value : 'NA')}
                                                </TableCell>

                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
