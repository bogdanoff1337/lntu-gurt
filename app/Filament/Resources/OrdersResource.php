<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdersResource\Pages;
use App\Filament\Resources\OrdersResource\RelationManagers;
use App\Models\Order;
use App\Models\Room;
use Filament\Forms\Components\Checkbox;
use Filament\Infolists\Components\Actions;
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

    public static ?string $navigationLabel = 'Замовлення';
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make("student_id")
                    ->label("Студент/вступник")
                ->options(\App\Models\Student::pluck('email', 'id')->toArray()),
                Select::make("room_id")
                    ->label("Студент/вступник")
                    ->options(\App\Models\Room::pluck('number', 'id')->toArray()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginated(false)
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
                Tables\Columns\TextColumn::make("room.places")
                    ->label("Місця")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\SelectColumn::make("status")
                    ->options([
                        'new' => 'Нове',
                        'approved' => 'Затверджено',
                        'rejected' => 'Відхилено',
                    ])
                    ->label("Статус")
                    ->beforeStateUpdated(function ($record, $state) {
                        if ($state === 'approved') {
                            $room = Room::find($record->room_id);

                            // Перевіряємо, чи кімната існує та чи кількість місць більше 0
                            if ($room && $room->places <= 0) {
                                // Повідомлення про неможливість затвердження замовлення
                                throw new \Exception('Неможливо затвердити замовлення. Немає доступних місць у кімнаті.');
                            }
                        }

                        return $state;
                    }),

            ])
            ->filters([
                Tables\Filters\Filter::make('has_benefits')
                    ->label('Має пільги')
                    ->form([
                        Checkbox::make('has_benefits')
                            ->label('Має пільги')
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['has_benefits'],
                            fn (Builder $query): Builder => $query->whereHas('student', function (Builder $query) {
                                $query->whereNotNull('benefits');
                            }),
                        );
                    }),
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
