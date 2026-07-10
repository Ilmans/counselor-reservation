import { router } from '@inertiajs/react';
import { Search, Check, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import WithdrawController from '@/actions/App/Http/Controllers/Admin/WithdrawController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Table } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import RejectModal from './components/reject-modal';
import { AdminWithdrawal } from '@/types/withdrawal';
import Filters from './components/withdraw-filter';
import { WITHDRAWAL_STATUS_CLASSES } from '@/types/badge';
import { useConfirm } from '@/hooks/use-confirm';
import PageHead from '@/components/page-head';

interface Props {
    withdrawals: PaginatedData<AdminWithdrawal>;
    filters: FILTERS;
}

function Index({ withdrawals, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();
    const [rejectOpen, setRejectOpen] = useState(false);
    const [selected, setSelected] = useState<AdminWithdrawal | null>(null);

    const onApprove = (withdrawal: AdminWithdrawal) => {
        confirm({
            title: 'Setujui Penarikan Dana',
            description: `Setujui penarikan sebesar ${withdrawal.amount_formatted} untuk ${withdrawal.counselor.name}? Dana dianggap sudah ditransfer secara manual ke rekening tujuan.`,
            confirmLabel: 'Setujui',
            onConfirm: () => {
                router.post(
                    WithdrawController.approve.url(withdrawal.id),
                    {},
                    {
                        preserveScroll: true,
                        onStart: () => setProcessing(true),
                        onFinish: () => setProcessing(false),
                    },
                );
            },
        });
    };

    const openReject = (withdrawal: AdminWithdrawal) => {
        setSelected(withdrawal);
        setRejectOpen(true);
    };

    return (
        <>
         <PageHead title="Daftar Penarikan" />
            <ConfirmDialog />
            <DashboardTitle
                title="Kelola Penarikan Dana"
                desc="Setujui atau tolak permintaan penarikan dana dari counselor."
            />

            <div className="mt-4 rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['withdrawals']}
                                url={WithdrawController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan no referensi"
                            />
                        </div>
                        <Filters filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>No. Referensi</Table.Cell>
                            <Table.Cell>Counselor</Table.Cell>
                            <Table.Cell>Tanggal</Table.Cell>
                            <Table.Cell>Bank Tujuan</Table.Cell>
                            <Table.Cell>Jumlah</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {withdrawals.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada permintaan penarikan dana"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            withdrawals.data.map((row) => (
                                <Table.Row key={row.reference}>
                                    <Table.Cell>{row.reference}</Table.Cell>

                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.counselor.name}
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                                            {row.counselor.email}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>{row.date}</Table.Cell>

                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.bank_name}
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                                            {row.account_number} &middot;{' '}
                                            {row.account_holder_name}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {row.amount_formatted}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Badge
                                            className={
                                                WITHDRAWAL_STATUS_CLASSES[
                                                    row.status
                                                ]
                                            }
                                        >
                                            {row.status_label}
                                        </Badge>
                                        {row.status === 'rejected' &&
                                            row.notes && (
                                                <p className="mt-1 max-w-[180px] text-[11px] text-muted-foreground">
                                                    {row.notes}
                                                </p>
                                            )}
                                    </Table.Cell>

                                    <Table.Cell align="right">
                                        {row.status === 'pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    onClick={() =>
                                                        onApprove(row)
                                                    }
                                                    type="button"
                                                    size="sm"
                                                    mode="outlined"
                                                >
                                                    <Check className="h-3.5 w-3.5" />
                                                    Setujui
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        openReject(row)
                                                    }
                                                    type="button"
                                                    size="sm"
                                                    mode="outlined"
                                                    variant="red"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                    Tolak
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                <Pagination pagination={withdrawals.meta} />
            </div>

            <RejectModal
                open={rejectOpen}
                onClose={() => setRejectOpen(false)}
                withdrawal={selected}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-withdrawals" />
);
