<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Ringkasan Konsultasi — {{ $reference }}</title>
    <style>
        @page {
            margin: 40px 50px;
        }

        body {
            font-family: 'DejaVu Serif', 'Times New Roman', serif;
            color: #000;
            font-size: 12px;
            line-height: 1.6;
        }

        .header {
            text-align: center;
            margin-bottom: 4px;
        }

        .header .org {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        .header .tagline {
            font-size: 10px;
        }

        .rule-double {
            border-top: 1.5px solid #000;
            border-bottom: 3px solid #000;
            height: 0;
            margin: 3px 0 14px 0;
        }

        .doc-title {
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 2px;
            text-decoration: underline;
        }

        .doc-number {
            text-align: center;
            font-size: 11px;
            margin-bottom: 22px;
        }

        table.identity {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
            font-size: 11.5px;
        }

        table.identity td {
            padding: 2px 0;
            vertical-align: top;
        }

        table.identity td.label {
            width: 34%;
        }

        table.identity td.colon {
            width: 3%;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 16px;
            margin-bottom: 6px;
        }

        .section-body {
            text-align: justify;
            font-size: 11.5px;
        }

        .section-body p {
            margin: 0 0 6px 0;
        }

        .section-body ul,
        .section-body ol {
            margin: 0 0 6px 0;
            padding-left: 18px;
        }

        .empty-note {
            font-style: italic;
            color: #444;
        }

        .entry-date {
            font-size: 10px;
            font-style: italic;
            color: #333;
            margin-bottom: 2px;
        }

        .signature {
            width: 100%;
            margin-top: 46px;
            font-size: 11.5px;
        }

        .signature td {
            vertical-align: top;
        }

        .signature .sign-col {
            width: 55%;
            text-align: center;
        }

        .signature .sign-space {
            height: 60px;
        }

        .footer {
            margin-top: 40px;
            padding-top: 8px;
            border-top: 1px solid #000;
            font-size: 9.5px;
            text-align: center;
            color: #333;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="org">{{ config('app.name') }}</div>
        <div class="tagline">Layanan Konsultasi Psikologis</div>
    </div>
    <div class="rule-double"></div>

    <div class="doc-title">Laporan Ringkasan Konsultasi Psikologis</div>
    <div class="doc-number">Nomor: {{ $reference }}/RKP/{{ $documentYear }}</div>

    <table class="identity">
        <tr>
            <td class="label">No. Referensi</td>
            <td class="colon">:</td>
            <td>{{ $reference }}</td>
        </tr>
        <tr>
            <td class="label">Tanggal Konsultasi</td>
            <td class="colon">:</td>
            <td>{{ $date }}, pukul {{ $time }}</td>
        </tr>
        <tr>
            <td class="label">Metode Konsultasi</td>
            <td class="colon">:</td>
            <td>{{ $methodLabel }}</td>
        </tr>
        <tr>
            <td class="label">Konselor Pemeriksa</td>
            <td class="colon">:</td>
            <td>{{ $counselorName }} ({{ $counselorSpecialization }})</td>
        </tr>
        <tr>
            <td class="label">Sesi Ke</td>
            <td class="colon">:</td>
            <td>{{ $isFirst ? 'Pertama' : 'Lanjutan' }}</td>
        </tr>
        <tr>
            <td class="label">Topik / Kategori</td>
            <td class="colon">:</td>
            <td>{{ $categories }}</td>
        </tr>
        <tr>
            <td class="label">Status Kerahasiaan</td>
            <td class="colon">:</td>
            <td>{{ $isAnonymous ? 'Identitas klien dirahasiakan (anonim)' : 'Tidak anonim' }}</td>
        </tr>
    </table>

    {{-- I. Keluhan Awal --}}
    <div class="section-title">I. Keluhan Awal</div>
    <div class="section-body">
        @forelse ($preSessionNotes as $note)
        <div class="entry-date">Dicatat pada {{ $note->created_at }}</div>
        {!! $note->content !!}
        @empty
        <p class="empty-note">Tidak ada catatan keluhan awal yang tercatat pada sesi ini.</p>
        @endforelse
    </div>

    {{-- II. Proses Konsultasi --}}
    <div class="section-title">II. Proses Konsultasi</div>
    <div class="section-body">
        @forelse ($sessionNotes as $note)
        <div class="entry-date">Dicatat pada {{ $note->created_at }}</div>
        {!! $note->content !!}
        @empty
        <p class="empty-note">Tidak ada catatan proses konsultasi yang tercatat pada sesi ini.</p>
        @endforelse
    </div>

    {{-- III. Hasil dan Kesimpulan --}}
    <div class="section-title">III. Hasil dan Kesimpulan</div>
    <div class="section-body">
        @forelse ($summaryNotes as $note)
        <div class="entry-date">Dicatat pada {{ $note->created_at }}</div>
        {!! $note->content !!}
        @empty
        <p class="empty-note">Konselor belum membagikan ringkasan hasil untuk sesi ini.</p>
        @endforelse
    </div>

    {{-- IV. Saran / Tindak Lanjut --}}
    <div class="section-title">IV. Saran / Tindak Lanjut</div>
    <div class="section-body">
        @forelse ($followUpNotes as $note)
        <div class="entry-date">Dicatat pada {{ $note->created_at }}</div>
        {!! $note->content !!}
        @empty
        <p class="empty-note">Tidak ada saran atau tindak lanjut yang tercatat pada sesi ini.</p>
        @endforelse
    </div>

    <table class="signature">
        <tr>
            <td></td>
            <td class="sign-col">
                {{ $generatedAt }}<br>
                Konselor Pemeriksa,
                <div class="sign-space"></div>
                <strong>{{ $counselorName }}</strong>
            </td>
        </tr>
    </table>

    <div class="footer">
        Dokumen ini dihasilkan otomatis oleh sistem {{ config('app.name') }} pada {{ $generatedAt }}
        dan bersifat rahasia — hanya untuk kepentingan pribadi pemilik reservasi.
    </div>
</body>

</html>
