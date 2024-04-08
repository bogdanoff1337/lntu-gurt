<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FacultyResource\Pages;
use App\Filament\Resources\FacultyResource\RelationManagers;
use App\Models\Faculty;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FacultyResource extends Resource
{
    protected static ?string $model = Faculty::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make("slug")
                    ->label("Назва")
                    ->required()
                    ->placeholder("Назва"),
                Forms\Components\TextInput::make('slug_short')
                    ->label('Коротка назва')
                    ->required()
                    ->placeholder('Коротка назва'),
                FileUpload::make('image')
                    ->image()
                    ->imageEditor()
                    ->label('Зображення')
                    ->disk('facult')

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("slug")
                    ->label("Назва")
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug_short')
                    ->label('Коротка назва')
                    ->searchable()
                    ->sortable(),
//                Tables\Columns\ImageColumn::make('image')
//                    ->label('Зображення')
//                    ->disk('facult')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
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
            'index' => Pages\ListFaculties::route('/'),
            'create' => Pages\CreateFaculty::route('/create'),
            'edit' => Pages\EditFaculty::route('/{record}/edit'),
        ];
    }
}
