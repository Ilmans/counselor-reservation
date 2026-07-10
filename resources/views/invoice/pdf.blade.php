<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #27272a;
            line-height: 1.6;
        }

        .header {
            width: 100%;
            border-bottom: 2px solid #e4e4e7;
            padding-bottom: 18px;
            margin-bottom: 24px;
        }

        .header table {
            width: 100%;
            border: none;
            margin: 0;
        }

        .header td {
            vertical-align: middle;
            padding: 0;
        }

        .logo {
            width: 60px;
            height: auto;
        }

        .app-name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 4px;
        }

        .invoice-title {
            font-size: 18px;
            font-weight: bold;
        }

        .invoice-ref {
            color: #71717a;
            font-size: 11px;
        }

        .badge {
            display: inline-block;
            padding: 5px 12px;
            border: 1px solid #d4d4d8;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            background: #f4f4f5;
        }

        .section {
            border: 1px solid #e4e4e7;
            border-radius: 8px;
            padding: 16px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .detail-table td {
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .detail-table tr:last-child td {
            border-bottom: none;
        }

        .label {
            width: 38%;
            color: #71717a;
        }

        .total-box {
            margin-top: 24px;
            border-top: 2px solid #e4e4e7;
            padding-top: 16px;
        }

        .total-table td {
            padding: 6px 0;
        }

        .total-label {
            font-size: 14px;
            font-weight: bold;
        }

        .total-value {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            color: #a1a1aa;
            font-size: 10px;
            border-top: 1px solid #e4e4e7;
            padding-top: 12px;
        }
    </style>
</head>

<body>

    <div class="header">
        <table>
            <tr>
                <td width="70">
                    <img src="{{ public_path('images/logo.png') }}" class="logo">
                </td>

                <td>
                    <div class="app-name">{{ config('app.name') }}</div>
                    <div class="invoice-title">Invoice Pembayaran</div>
                    <div class="invoice-ref">{{ $invoice['reference'] }}</div>
                </td>

                <td align="right">
                    <span class="badge">
                        {{ strtoupper($invoice['status']) }}
                    </span>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <table class="detail-table">
            <tr>
                <td class="label">Konselor</td>
                <td>{{ $invoice['counselor']['name'] }}</td>
            </tr>

            <tr>
                <td class="label">Spesialisasi</td>
                <td>{{ $invoice['counselor']['specialization'] }}</td>
            </tr>

            <tr>
                <td class="label">Tanggal Sesi</td>
                <td>{{ $invoice['consultation']['date'] }}</td>
            </tr>

            <tr>
                <td class="label">Waktu Sesi</td>
                <td>{{ $invoice['consultation']['time'] }}</td>
            </tr>

            <tr>
                <td class="label">Metode Konsultasi</td>
                <td>{{ ucfirst($invoice['consultation']['method']) }}</td>
            </tr>

            <tr>
                <td class="label">Referensi Konsultasi</td>
                <td>{{ $invoice['consultation']['reference'] }}</td>
            </tr>

            @if($invoice['payment_method'])
            <tr>
                <td class="label">Metode Pembayaran</td>
                <td>{{ $invoice['payment_method']['name'] }}</td>
            </tr>
            @endif

            @if($invoice['paid_at'])
            <tr>
                <td class="label">Tanggal Pembayaran</td>
                <td>
                    {{ \Carbon\Carbon::parse($invoice['paid_at'])->translatedFormat('d F Y, H:i') }}
                </td>
            </tr>
            @endif
        </table>

        <div class="total-box">
            <table class="total-table">
                <tr>
                    <td class="total-label">
                        Total Pembayaran
                    </td>

                    <td class="total-value">
                        {{ $invoice['amount_formatted'] }}
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div class="footer">
        Invoice ini dibuat secara otomatis oleh <strong>{{ config('app.name') }}</strong>.
        Tidak memerlukan tanda tangan maupun stempel.
    </div>

</body>

</html>
