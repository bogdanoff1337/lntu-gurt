<?php

namespace App\Filament\Resources\PrivilegesResource\Pages;

use App\Filament\Resources\PrivilegesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPrivileges extends EditRecord
{
    protected static string $resource = PrivilegesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
