import {
    Clock,
    Copy,
    ExternalLink,
    Link2,
    MapPin,
    PenLine,
    Tag,
    Video,
} from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useConfirm } from '@/hooks/use-confirm';
import type { ConsultationDetail } from '@/types/consultation';
import Modal from '@/components/ui/modal';
import ManageStatusConsultationController from '@/actions/App/Http/Controllers/Counselor/ManageStatusConsultationController';

interface Props {
    consultation: ConsultationDetail;
}

function InfoConsultation({ consultation }: Props) {
    const [copied, setCopied] = useState(false);
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();

    const [manualOpen, setManualOpen] = useState(false);
    const [manualLink, setManualLink] = useState('');

    const [manualError, setManualError] = useState<string | null>(null);
    const [manualProcessing, setManualProcessing] = useState(false);

    const isOnline = consultation.method_label === 'Online';
    const duration = consultation.schedule?.duration ?? consultation.duration;
    const categories = consultation.categories
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

    async function handleCopy() {
        if (!consultation.meeting_link) return;
        try {
            await navigator.clipboard.writeText(consultation.meeting_link);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard bisa gagal, diamkan
        }
    }

    function askGenerateLink() {
        confirm({
            title: 'Buat Link Meeting',
            description:
                'Link Zoom baru akan dibuat untuk sesi ini. Lanjutkan?',
            confirmLabel: 'Ya, Buat Link',
            cancelLabel: 'Batal',
            variant: 'default',
            onConfirm: async () => {
                setProcessing(true);
                // router.post(
                //     ManageStatusConsultationController.updateMeetingLink.url(
                //         consultation.id,
                //     ),
                //     {
                //         meeting_link: manualLink,
                //     },
                //     { onFinish: () => setProcessing(false) },
                // );
            },
        });
    }

    function closeManual() {
        setManualOpen(false);
        setManualLink('');
        setManualPassword('');
        setManualError(null);
    }

    function handleManualSubmit() {
        if (!manualLink.trim()) {
            setManualError('Link meeting wajib diisi.');
            return;
        }

        setManualProcessing(true);
        router.post(
            ManageStatusConsultationController.updateMeetingLink.url(
                consultation.id,
            ),
            {
                meeting_link: manualLink,
            },
            {
                onSuccess: () => closeManual(),
                onError: (errors) => {
                    setManualError(
                        errors.meeting_link ?? 'Gagal menyimpan link.',
                    );
                },
                onFinish: () => setManualProcessing(false),
            },
        );
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            {/* ==== Ringkasan sesi ==== */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 text-sm sm:grid-cols-3">
                <InfoItem
                    icon={<Tag size={13} />}
                    iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400"
                    label="Topik"
                >
                    <div className="mt-1 flex flex-wrap gap-1.5">
                        {categories.map((category) => (
                            <span
                                key={category}
                                className="inline-flex items-center rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700 dark:bg-violet-950/30 dark:text-violet-400"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </InfoItem>

                <InfoItem
                    icon={<Video size={13} />}
                    iconClassName="bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400"
                    label="Metode"
                >
                    <p className="mt-0.5 font-medium text-foreground">
                        {consultation.method_label}
                        <span className="ml-1.5 font-normal text-muted-foreground">
                            ·{' '}
                            {consultation.is_first
                                ? 'Sesi Pertama'
                                : 'Sesi Lanjutan'}
                        </span>
                    </p>
                </InfoItem>

                <InfoItem
                    icon={<Clock size={13} />}
                    iconClassName="bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
                    label="Durasi"
                >
                    <p className="mt-0.5 font-medium text-foreground">
                        {duration}
                    </p>
                </InfoItem>
            </div>

            {/* ==== Section Online: link meeting ==== */}
            {isOnline && (
                <div className="mt-4 rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Video size={12} /> Link Zoom
                    </p>

                    {consultation.meeting_link ? (
                        <>
                            <p className="mt-1 text-sm break-all text-foreground">
                                {consultation.meeting_link}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                <Button
                                    variant="default"
                                    mode="filled"
                                    size="sm"
                                    className="!rounded-full"
                                    asChild
                                >
                                    <a
                                        href={consultation.meeting_link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <ExternalLink size={12} /> Buka Link
                                    </a>
                                </Button>

                                <Button
                                    variant="default"
                                    mode="outlined"
                                    size="sm"
                                    className="!rounded-full"
                                    onClick={handleCopy}
                                >
                                    <Copy size={12} />{' '}
                                    {copied ? 'Tersalin!' : 'Salin'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Link meeting belum dibuat untuk sesi ini.
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                <Button
                                    variant="default"
                                    mode="filled"
                                    size="sm"
                                    className="!rounded-full"
                                    onClick={askGenerateLink}
                                >
                                    <Link2 size={12} /> Generate Otomatis
                                </Button>

                                <Button
                                    variant="default"
                                    mode="outlined"
                                    size="sm"
                                    className="!rounded-full"
                                    onClick={() => setManualOpen(true)}
                                >
                                    <PenLine size={12} /> Input Manual
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ==== Section Tatap Muka: lokasi ==== */}
            {!isOnline && consultation.location && (
                <div className="mt-4 rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <MapPin size={12} /> Lokasi Pertemuan
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                        {consultation.location.name ??
                            'Lokasi belum ditentukan'}
                    </p>
                    {consultation.location.address && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {consultation.location.address}
                            {consultation.location.city
                                ? `, ${consultation.location.city}`
                                : ''}
                        </p>
                    )}

                    {consultation.location.address && (
                        <p className="mt-2.5 rounded-lg bg-card px-3 py-2 text-xs text-muted-foreground">
                            Klien akan datang ke alamat Anda di{' '}
                            <span className="font-medium text-foreground">
                                {consultation.location.address}
                                {consultation.location.city
                                    ? `, ${consultation.location.city}`
                                    : ''}
                            </span>
                            . Pastikan lokasi dapat diakses pada jadwal sesi.
                        </p>
                    )}
                </div>
            )}

            {/* ==== Modal input manual ==== */}
            <Modal open={manualOpen} onClose={closeManual}>
                <h2 className="font-serif text-base text-foreground">
                    Input Link Meeting
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    Masukkan link meeting yang sudah dibuat secara manual (mis.
                    Zoom, Google Meet) untuk sesi ini.
                </p>

                <div className="mt-4 space-y-3">
                    <div>
                        <Input
                            label="Link Meeting"
                            placeholder="https://zoom.us/j/..."
                            value={manualLink}
                            onChange={(e) => {
                                setManualLink(e.target.value);
                                if (manualError) setManualError(null);
                            }}
                            error={manualError ?? undefined}
                        />
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        mode="outlined"
                        size="sm"
                        disabled={manualProcessing}
                        onClick={closeManual}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="default"
                        mode="filled"
                        size="sm"
                        loading={manualProcessing}
                        onClick={handleManualSubmit}
                    >
                        <Link2 size={14} /> Simpan Link
                    </Button>
                </div>
            </Modal>

            <ConfirmDialog />
        </div>
    );
}

function InfoItem({
    icon,
    iconClassName,
    label,
    children,
}: {
    icon: React.ReactNode;
    iconClassName: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-2.5">
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconClassName}`}
            >
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                {children}
            </div>
        </div>
    );
}

export default InfoConsultation;
