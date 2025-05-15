<?php

namespace App\Filament\Resources\AcceptedOrdersResource\Pages;

use App\Filament\Resources\AcceptedOrdersResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAcceptedOrders extends EditRecord
{
    protected static string $resource = AcceptedOrdersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
