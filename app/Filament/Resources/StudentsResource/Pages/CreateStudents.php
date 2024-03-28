<?php

namespace App\Filament\Resources\StudentsResource\Pages;

use App\Filament\Resources\StudentsResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateStudents extends CreateRecord
{
    protected static string $resource = StudentsResource::class;
}
