<?php

namespace App\Filament\Resources\PrivilegesResource\Pages;

use App\Filament\Resources\PrivilegesResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPrivileges extends ListRecords
{
    protected static string $resource = PrivilegesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
