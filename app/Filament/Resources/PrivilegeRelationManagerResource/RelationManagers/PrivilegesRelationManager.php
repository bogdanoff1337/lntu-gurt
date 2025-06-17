<?php

namespace App\Filament\Resources\PrivilegeRelationManagerResource\RelationManagers;

use App\Models\Privilege;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class PrivilegesRelationManager extends RelationManager
{
    protected static string $relationship = 'privileges';

    protected static ?string $label = 'Пільги';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('privilege_id')
                    ->label('Пільга')
                    ->options(Privilege::pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('privilege.name')
                    ->columnSpanFull()
                    ->label('Опис пільги')
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->form([
                        Forms\Components\Select::make('privilege_id')
                            ->label('Опис пільги')
                            ->relationship('privileges', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
