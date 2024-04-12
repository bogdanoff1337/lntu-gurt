<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DormitoryResource\Pages;
use App\Filament\Resources\DormitoryResource\RelationManagers;
use App\Models\Dormitory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DormitoryResource extends Resource
{
    protected static ?string $model = Dormitory::class;
    protected static ?string $navigationGroup = 'Основна інформація';
    public static ?string $navigationLabel = 'Гуртожитки';

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make("slug")
                    ->label("Назва")
                    ->required()
                    ->placeholder("Назва"),
                Forms\Components\TextInput::make('address')
                    ->label('Адреса')
                    ->required()
                    ->placeholder('Адреса'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("slug")
                    ->label("Назва")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('address')
                    ->label('Адреса')
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
            'index' => Pages\ListDormitories::route('/'),
            'create' => Pages\CreateDormitory::route('/create'),
            'edit' => Pages\EditDormitory::route('/{record}/edit'),
        ];
    }
}
