<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\Settings;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class GenerateContractPdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected Order $order) {}

    public function handle(): void
    {
        $settings = Settings::getMediaSettings('stamp');
        $stamp = $settings->media->first()->getPath('settings');

        $pdf = PDF::loadView('pdfs.contract', [
            'student' => $this->order->student,
            'room'    => $this->order->room,
            'sing'    => $stamp,
        ]);

        $path = "contracts/contract_{$this->order->id}.pdf";

        Storage::put($path, $pdf->output());

        $this->order->updateQuietly(['contract_path' => $path]);
    }
}
