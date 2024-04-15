<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentsResource\Pages;
use App\Filament\Resources\StudentsResource\RelationManagers;
use App\Models\Student;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StudentsResource extends Resource
{
    protected static ?string $model = Student::class;

    public static ?string $navigationLabel = 'Студенти';

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make("last_name")
                    ->label("Ім'я")
                    ->required()
                    ->placeholder("Name"),
                Forms\Components\TextInput::make("first_name")
                    ->label("Прізвище")
                    ->required()
                    ->placeholder("Surname"),

                Forms\Components\TextInput::make("middle_name")
                    ->label("По-батькові")
                    ->required()
                    ->placeholder("Middle name"),
                Forms\Components\TextInput::make("phone")
                    ->label("Номер телефону")
                    ->required()
                    ->placeholder("Phone"),
                Forms\Components\TextInput::make("city")
                    ->label("Місце проживання")
                    ->required()
                    ->placeholder("City"),
                Forms\Components\TextInput::make("benefits")
                    ->label("Перелік пільг")
                    ->required()
                    ->placeholder("Benefits"),
                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->required()
                    ->placeholder('Email'),
                Forms\Components\TextInput::make('password')
                    ->password()
//                    ->revealable()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("first_name")
                    ->label("Ім'я")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("last_name")
                    ->label("Призвіще")
                    ->searchable(),
                Tables\Columns\TextColumn::make("middle_name")
                    ->label("По-батькові")
                    ->searchable(),
                Tables\Columns\TextColumn::make("phone")
                    ->label("Номер телефону")
                    ->searchable(),
                Tables\Columns\TextColumn::make("city")
                    ->label("Місце проживання")
                    ->searchable(),
                Tables\Columns\TextColumn::make("benefits")
                    ->label("Перелік пільг")
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStudents::route('/'),
//            'create' => Pages\CreateStudents::route('/create'),
            'edit' => Pages\EditStudents::route('/{record}/edit'),
        ];
    }
}
