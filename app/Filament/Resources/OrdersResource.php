<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdersResource\Pages;
use App\Filament\Resources\OrdersResource\RelationManagers;
use App\Models\Faculty;
use App\Models\Order;
use App\Models\Room;
use App\Models\Student;
use Filament\Forms\Components\Checkbox;
use Filament\Infolists\Components\Actions;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\Filter;
use Filament\Forms\Components\Select;

class OrdersResource extends Resource
{
    protected static ?string $model = Order::class;

    public static ?string $navigationLabel = 'Заявки';
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make("student_id")
                    ->label("Студент/вступник")
                ->options(Student::query()->pluck('email', 'id')->toArray()),
                Select::make("room_id")
                    ->label("Кімната")
                    ->options(Room::query()->where('places', '>', 0)->pluck('number', 'id')->toArray()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginated()
            ->columns([
                Tables\Columns\TextColumn::make("student.email")
                    ->label("Студент/вступник")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("student.benefits")
                    ->label("Пільги")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("room.number")
                    ->label("Кімната")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("room.faculty.slug_short")
                    ->label("Факультет")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("room.places")
                    ->label("Місця")
                    ->searchable()
                    ->sortable(),
                SelectColumn::make('status')
                    ->label('Статус')
                    ->options(fn(Order $record) => [
                        ...($record->status === 'new' ? ['new'      => 'Очікує на розгляд'] : []),
                        'approved' => 'Затверджено',
                        'rejected' => 'Відхилено',
                    ])
                    ->default('new')
            ])
            ->filters([
                Filter::make('has_benefits')
                    ->label('Має пільги')
                    ->query(fn (Builder $query) => $query
                        ->whereHas('student', fn (Builder $q) => $q->whereNotNull('benefits'))
                    ),
                SelectFilter::make('faculty')
                    ->label('Факультети')
                    ->multiple()
                    ->relationship('room.faculty', 'slug_short')
                    ->preload()
                    ->searchable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListOrders::route('/'),

            'create' => Pages\CreateOrders::route('/create'),
            'edit' => Pages\EditOrders::route('/{record}/edit'),
        ];
    }
}
