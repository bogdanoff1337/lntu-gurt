<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Договір</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            position: relative;
        }
        .stamp {
            position: absolute;
            bottom: 30px;
            right: 30px;
            width: 100px;
        }
    </style>
</head>
<body>
<h1>Договір поселення</h1>
<p>Студент: {{ $student->getFullNameAttribute() }}</p>
<p>Місце проживання: {{ $student->city->getFullNameAttribute() }}</p>
<p>Номер телефону: {{ $student->phone }}</p>
<p>Кімната: {{ $room->number }} факультет: ({{ $room->faculty->slug_short }})</p>
<p>Дата створення документу: {{ now()->format('d.m.Y') }}</p>
<img src="{{ $sing }}" class="stamp">
</body>
</html>
