<?php

namespace App\Filament\Resources\UsersResource\Pages;

use App\Filament\Resources\UsersResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Tables\Columns\TextColumn;

class CreateUsers extends CreateRecord
{
    protected static string $resource = UsersResource::class;

    public function fields(): array
    {
        return [
            //
        ];
    }

}
