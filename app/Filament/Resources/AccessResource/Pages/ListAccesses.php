<?php

namespace App\Filament\Resources\AccessResource\Pages;

use App\Filament\Resources\AccessResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAccesses extends ListRecords
{
    protected static string $resource = AccessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
