<h1>Договір поселення</h1>
<p>Студент: {{ $student->name }}</p>
<p>Кімната: {{ $room->number }} ({{ $room->faculty->slug_short }})</p>
<p>Дата: {{ now()->format('d.m.Y') }}</p>
