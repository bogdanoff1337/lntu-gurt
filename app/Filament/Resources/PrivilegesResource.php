<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PrivilegesResource\Pages;
use App\Models\Privilege;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class PrivilegesResource extends Resource
{
    protected static ?string $model = Privilege::class;

    protected static ?string $navigationGroup = 'Пільги';
    public static ?string $navigationLabel = 'Пільги';

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Назва пільги')
                            ->required()
                            ->placeholder('Назва пільги'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Активна')
                            ->required()
                            ->inline(false),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Назва пільги')
                    ->searchable()
                    ->sortable(),
                ToggleColumn::make('is_active')
                    ->label('Активна')
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
            'index' => Pages\ListPrivileges::route('/'),
            'create' => Pages\CreatePrivileges::route('/create'),
            'edit' => Pages\EditPrivileges::route('/{record}/edit'),
        ];
    }
}
