import { PaginatedData } from '@/types/consultation';
import {
    Wallet,
    Withdrawal,
} from '@/types/withdrawal';
import {
    Search,
    Wallet as WalletIcon,
    TrendingUp,
    ArrowDownToLine,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import Breadcrumb from '@/components/breadcumb';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import type { FILTERS } from '@/types/filter';
import FinanceController from '@/actions/App/Http/Controllers/Counselor/FinanceController';

import PageHead from '@/components/page-head';
import { WITHDRAWAL_STATUS_CLASSES } from '@/types/badge';
import Filters from './components/finance-filter';
import WithdrawModal from './components/withdraw-modal';

const breadcumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Konselor', href: '/' },
    { label: 'Keuangan' },
];

function formatCurrency(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

interface Props {
    wallet: Wallet;
    upcomingBalance: number;
    withdrawals: PaginatedData<Withdrawal>;
    filters: FILTERS;
}

function Index({ wallet, upcomingBalance, withdrawals, filters }: Props) {
    const [withdrawOpen, setWithdrawOpen] = useState(false);

    return (
        <>
            <PageHead title="Keuangan" />
            <Breadcrumb items={breadcumbs} />

            {/* --- Ringkasan Saldo --- */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <WalletIcon className="h-4 w-4" />
                            <p className="text-sm font-medium">Total Saldo</p>
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            onClick={() => setWithdrawOpen(true)}
                        >
                            <ArrowDownToLine className="mr-1 h-3.5 w-3.5" />
                            Tarik Dana
                        </Button>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                        {formatCurrency(wallet.balance)}
                    </p>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                        Saldo yang bisa kamu tarik ke rekening.
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <p className="text-sm font-medium">Saldo Mendatang</p>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                        {formatCurrency(upcomingBalance)}
                    </p>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                        Dari sesi yang sudah dikonfirmasi & dibayar, tapi belum
                        selesai.
                    </p>
                </div>
            </div>

            {/* --- Riwayat Penarikan --- */}
            <div className="mt-5 rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['withdrawals']}
                                url={FinanceController.index.url()}
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
                            <Table.Cell>Tanggal</Table.Cell>
                            <Table.Cell>Bank Tujuan</Table.Cell>
                            <Table.Cell>Jumlah</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {withdrawals.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={5}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada riwayat penarikan dana"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            withdrawals.data.map((row) => (
                                <Table.Row key={row.reference}>
                                    <Table.Cell>{row.reference}</Table.Cell>
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
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                <Pagination pagination={withdrawals.meta} />
            </div>

            <WithdrawModal
                open={withdrawOpen}
                onClose={() => setWithdrawOpen(false)}
                wallet={wallet}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="finance" />
);
