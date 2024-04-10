<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomsResource\Pages;
use App\Models\Room;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
class RoomsResource extends Resource
{
    protected static ?string $model = Room::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('number')
                    ->label('Номер кімнати'),
                TextInput::make('floor')
                    ->label('Поверх'),
                Select::make('section')
                    ->label('Секція')
                    ->options([
                        'Ліворуч' => 'Ліворуч',
                        'Праворуч' => 'Праворуч',
                    ]),
                Select::make('block')
                    ->label('Блок')
                    ->options([
                        'Перший' => 'Перший',
                        'Другий' => 'Другий'
                        ]),
                Select::make('places')
                    ->label('Кількість місць')
                    ->options([
                        '1' => '1',
                        '2' => '2',
                        '3' => '3',
                        '4' => '4',
                    ]),
                Select::make('faculty_id')
                    ->label('Факультет')
                    ->options(\App\Models\Faculty::pluck('slug_short', 'id')->toArray()),
                Select::make('dormitory_id')
                    ->label('Гуртожиток')
                    ->options(\App\Models\Dormitory::pluck('slug', 'id')->toArray()),
                FileUpload::make('images')
                    ->label('Зображення')
                    ->image()
                    ->imageEditor()
                    ->multiple()
                    ->disk('room')

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')
                    ->label('Номер кімнати')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('floor')
                    ->label('Поверх')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('section')
                    ->label('Секція')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('block')
                    ->label('Блок')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\SelectColumn::make('places')
                    ->label('Кількість місць')
                    ->options([
                        '1' => '1',
                        '2' => '2',
                        '3' => '3',
                        '4' => '4',
                    ])
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('faculty.slug_short')
                    ->label('Факультет')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListRooms::route('/'),
            'create' => Pages\CreateRooms::route('/create'),
            'edit' => Pages\EditRooms::route('/{record}/edit'),
        ];
    }
}
