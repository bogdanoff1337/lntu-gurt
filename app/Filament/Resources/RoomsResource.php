<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomsResource\Pages;
use App\Models\Room;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Faculty;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class RoomsResource extends Resource
{
    protected static ?string $model = Room::class;
    protected static ?string $navigationGroup = 'Основна інформація';
    public static ?string $navigationLabel = 'Кімнати';

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
                Select::make('gender')
                    ->label('Стать')
                    ->options([
                        'Чоловіча' => 'Чоловіча',
                        'Жіноча' => 'Жіноча'
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
                SpatieMediaLibraryFileUpload::make('avatar')
                    ->label('Зображення')
                    ->collection('room')
                    ->image()
                    ->imageEditor()
                    ->multiple()
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
                Tables\Filters\Filter::make('where_faculty')
                    ->label('Факультет')
                    ->form(function () {
                        $faculties = Faculty::pluck('slug_short', 'slug_short')->toArray();
                        return [
                            Select::make('faculty.slug_short')
                                ->label('Факультет')
                                ->options($faculties)
                        ];

                    })
                    ->query(function (Builder $query, array $data): Builder {
                       return $query->when($data['faculty'], function (Builder $query, $faculty) {
                            $query->whereHas('faculty', function (Builder $query) use ($faculty) {
                                $query->where('slug_short', $faculty);
                            });
                           });
                    }),
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
