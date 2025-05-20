<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingsResource\Pages;
use App\Filament\Resources\SettingsResource\RelationManagers;
use App\Models\Settings;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
class SettingsResource extends Resource
{
    protected static ?string $model = Settings::class;

    protected static ?string $navigationGroup = 'Адміністратори';

    protected static ?string $navigationLabel = 'Налаштування';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Назва'),
                Forms\Components\Fieldset::make('Значення')
                    ->schema([
                        Forms\Components\TextInput::make('value')
                            ->label('Значення')
                            ->visible(fn ($record) => $record?->type === 'integer'),

                        SpatieMediaLibraryFileUpload::make('media')
                            ->collection('settings')
                            ->label('Файл')
                            ->visible(fn ($record) => $record?->type === 'file'),

                        Forms\Components\DatePicker::make('value')
                            ->label('Дата')
                            ->visible(fn ($record) => $record?->type === 'date'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Назва'),
                Tables\Columns\TextColumn::make('value')
                    ->label('Значення'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
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
            'index' => Pages\ListSettings::route('/'),
            'edit' => Pages\EditSettings::route('/{record}/edit'),
        ];
    }
}
