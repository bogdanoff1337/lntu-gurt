<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccessResource\Pages;
use App\Filament\Resources\AccessResource\RelationManagers;
use App\Models\AccessToRegister;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
class AccessResource extends Resource
{
    protected static ?string $model = AccessToRegister::class;
    protected static ?string $navigationGroup = 'Доступ до реєстрації';
    public static ?string $navigationLabel = 'Доступ до реєстрації';

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email')
                    ->label('Емейл')
                    ->required(),
                Select::make('access')
                    ->options([
                        1 => 'Так',
                        0 => 'Ні',
                    ])
                    ->label('Дозвіл')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('email')
                    ->label('Емейл')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\SelectColumn::make('access')
                    ->options([
                        1 => 'Так',
                        0 => 'Ні',
                    ])
                    ->label('Дозвіл')
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
            'index' => Pages\ListAccesses::route('/'),
            'create' => Pages\CreateAccess::route('/create'),
            'edit' => Pages\EditAccess::route('/{record}/edit'),
        ];
    }
}
