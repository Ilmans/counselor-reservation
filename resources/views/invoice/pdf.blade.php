<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            color: #18181b;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        h1 {
            font-size: 18px;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
        }

        td {
            padding: 6px 0;
        }

        .label {
            color: #71717a;
            width: 40%;
        }

        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: bold;
        }

        .total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 16px;
            border-top: 1px solid #e4e4e7;
            padding-top: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <div>
            <h1>Invoice</h1>
            <p>{{ $invoice['reference'] }}</p>
        </div>
        <div style="text-align:right">
            <span class="badge" style="background:#f4f4f5">{{ strtoupper($invoice['status']) }}</span>
        </div>
    </div>

    <table>
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
            <td class="label">Metode</td>
            <td>{{ ucfirst($invoice['consultation']['method']) }}</td>
        </tr>
        <tr>
            <td class="label">Ref. Konsultasi</td>
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
            <td class="label">Dibayar Pada</td>
            <td>{{ \Carbon\Carbon::parse($invoice['paid_at'])->translatedFormat('d M Y, H:i') }}</td>
        </tr>
        @endif
    </table>

    <p class="total">Total: {{ $invoice['amount_formatted'] }}</p>
</body>

</html>
