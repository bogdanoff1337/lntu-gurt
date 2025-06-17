<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class OrderChart extends ApexChartWidget
{
    protected static ?string $chartId = 'orderChart';
    protected static ?string $heading = 'Статистика заявок';
    public ?string $filter = 'today';

    protected function getFilters(): ?array
    {
        return [
            'today' => 'Сьогодні',
            'week' => 'Останні 7 днів',
            'month' => 'Останні 30 днів',
            'year' => 'Цей рік',
        ];
    }

    protected function getOptions(): array
    {
        $filter = $this->filter;
        $query = Order::query();

        match ($filter) {
            'today' => $query->whereDate('created_at', now()),
            'week' => $query->whereBetween('created_at', [now()->subDays(6), now()]),
            'month' => $query->whereBetween('created_at', [now()->subDays(29), now()]),
            default => $query->whereYear('created_at', now()->year),
        };

        $groupBy = match ($filter) {
            'today' => "EXTRACT(HOUR FROM created_at)",
            'week', 'month' => "DATE(created_at)",
            'year' => "EXTRACT(MONTH FROM created_at)",
        };

        $orders = $query->selectRaw("$groupBy as label, COUNT(*) as total")
            ->groupBy('label')
            ->orderBy('label')
            ->pluck('total', 'label');

        [$labels, $data] = match ($filter) {
            'today' => [
                collect(range(0, 23))->map(fn($h) => str_pad($h, 2, '0', STR_PAD_LEFT) . ':00'),
                collect(range(0, 23))->map(fn($h) => $orders->get($h, 0)),
            ],
            'week', 'month' => [
                $orders->keys(),
                $orders->values(),
            ],
            'year' => [
                collect(['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд']),
                collect(range(1, 12))->map(fn($m) => $orders->get($m, 0)),
            ]
        };

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'Кількість заявок',
                    'data' => $data->toArray(),
                ],
            ],
            'xaxis' => [
                'categories' => $labels,
            ],
            'colors' => ['#0ea5e9'],
        ];
    }
}
