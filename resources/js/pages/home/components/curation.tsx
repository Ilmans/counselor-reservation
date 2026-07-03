import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Verifikasi kredensial',
        desc: 'Kami cek latar belakang pendidikan, izin praktik, dan sertifikasi setiap calon konselor sebelum melangkah lebih jauh.',
    },
    {
        number: '02',
        title: 'Wawancara pendekatan',
        desc: 'Tim kami ngobrol langsung soal bagaimana mereka menangani sesi, bukan cuma soal gelar di atas kertas.',
    },
    {
        number: '03',
        title: 'Ditambahkan & dipantau',
        desc: 'Profil diaktifkan oleh tim Tenang dan terus ditinjau berkala berdasarkan masukan klien.',
    },
];

function Curation() {
    return (
        <div className="bg-primary/5 px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 max-w-lg">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Bagaimana Kami Memilih
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground md:text-4xl">
                        Setiap konselor
                        <span className="text-primary italic">
                            {' '}
                            dikurasi, bukan sekadar daftar.
                        </span>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed font-light text-muted-foreground">
                        Saat ini konselor di Tenang belum bisa mendaftar sendiri
                        — semua ditambahkan langsung oleh tim kami lewat proses
                        berikut, agar setiap profil yang kamu lihat sudah
                        teruji.
                    </p>
                </div>

                <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative">
                            <span className="font-serif text-4xl font-normal text-primary/25">
                                {step.number}
                            </span>
                            <h3 className="mt-3 mb-2 text-base font-semibold text-foreground">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed font-light text-muted-foreground">
                                {step.desc}
                            </p>
                            {i < steps.length - 1 && (
                                <span className="absolute top-5 -right-3 hidden h-px w-6 bg-border sm:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Curation;
