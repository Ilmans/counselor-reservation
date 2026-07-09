import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import React, { ReactNode } from 'react';
import KonselorDetailKonsultasi from './components/detail/tes';
import { ConsultationDetail } from '@/types/consultation';
import StatusHero from './components/detail/status-hero';
import InfoConsultation from './components/detail/info-consultation';
import ConsultationNotes from './components/detail/notes-consultation';
import NotesForm from './components/detail/notes-form';
import { PhoneCall, ShieldCheck } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { AlertCard } from '@/components/ui/alert';

interface Props {
    consultation: ConsultationDetail;
}
function Show({ consultation }: Props) {
    const { alert } = usePage().props;
    
    return (
        <>
            {alert && (
                <div className="my-2">
                    <AlertCard variant={alert.type}>{alert.message}</AlertCard>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-6">
                <div className="min-w-0 space-y-4">
                    {/* ---- Status Sesi ---- */}
                    <StatusHero consultation={consultation} />
                    <InfoConsultation consultation={consultation} />
                    <div className="rounded-2xl border border-border bg-card p-4">
                        <p className="mb-3 flex items-center gap-2 font-serif text-base text-foreground">
                            Catatan Konsultasi
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                                3
                            </span>
                        </p>

                        <ConsultationNotes notes={consultation.notes} />

                        <div className="mt-4">
                            <NotesForm consultationId={consultation.id} />
                        </div>
                    </div>
                </div>
                <aside className="space-y-3 lg:sticky lg:top-6">
                    {/* Identitas Klien */}
                    <p className="font-semibold">Identitas Klien</p>
                    <div className="rounded-2xl border border-border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground/70">
                                -
                            </span>
                            <div className="min-w-0">
                                <p className="truncate font-serif text-base text-foreground">
                                    {consultation.is_anonymous
                                        ? 'Anonim.'
                                        : consultation.user.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {consultation.user.since}
                                </p>
                            </div>
                        </div>

                        {/* Ditampilkan hanya jika klien tidak anonim */}
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Jenis Kelamin
                                </p>
                                <p className="mt-0.5 font-medium text-foreground">
                                    {consultation.is_anonymous
                                        ? '-'
                                        : consultation.user.gender}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Usia
                                </p>
                                <p className="mt-0.5 font-medium text-foreground">
                                    {consultation.is_anonymous
                                        ? '-'
                                        : consultation.user.age}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
                            >
                                <PhoneCall size={14} /> Hubungi Klien
                            </button>
                        </div>
                    </div>

                    {/* Pengingat Kerahasiaan */}
                    <div className="flex items-start gap-2.5 rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/50 dark:bg-teal-950/20">
                        <ShieldCheck
                            size={16}
                            className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400"
                        />
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-teal-800 dark:text-teal-300">
                                Jaga kerahasiaan data klien
                            </p>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-teal-700/80 dark:text-teal-400/70">
                                Catatan dan identitas klien hanya boleh diakses
                                untuk kepentingan layanan. Hindari membagikan di
                                luar sistem ini.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Show;
Show.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="consultations" />
);
