<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AcceptedOrdersResource\Pages;
use App\Jobs\GenerateContractPdf;
use App\Models\Order;
use App\Models\Room;
use App\Models\Student;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Form as FilamentForm;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\ViewAction;
use Illuminate\Support\Collection;

class AcceptedOrdersResource extends Resource
{
    protected static ?string $model = Order::class;

    public static function getNavigationLabel(): string
    {
        return 'Прийняті заявки';
    }

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-check-circle';
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->accepted()
            ->with(['student', 'room']);
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('student_id')
                    ->label("Студент/вступник")
                    ->relationship('student', 'email'),

                Select::make('room_id')
                    ->label("Кімната")
                    ->relationship('room', 'number'),

                Placeholder::make('room.student')
                    ->label('Прізвище, ім\'я, по батькові')
                    ->content(fn (Order $record): string => $record->student->first_name . ' ' . $record->student->last_name . ' ' . $record->student->middle_name),

                DateTimePicker::make('updated_at')
                    ->label('Затверджено')
                    ->default(now())
                    ->format('Y-m-d H:i:s')
                    ->disabled(),

                Placeholder::make('room.student')
                    ->label('Місце проживання')
                    ->content(fn (Order $record): string => $record->student->city->name . ' (' . $record->student->city->community . ')' . ' ' . $record->student->city->region),
                Placeholder::make('room.student')
                    ->label('Факультет')
                    ->content(fn (Order $record): string => $record->student->faculty->slug),

                Placeholder::make('room.student')
                    ->label('Курс')
                    ->content(fn (Order $record): string => $record->student?->course ? $record->student->course : 'Не вказано'),

                Placeholder::make('room.student')
                    ->label('Пільги')
                    ->content(fn (Order $record): string => $record->student->benefits ? $record->student->benefits : 'Не вказано'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('student.email')
                    ->label('Студент')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('room.number')
                    ->label('Кімната')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->label('Затверджено')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Filter::make('created_at')
                    ->form([
                        DatePicker::make('created_from'),
                        DatePicker::make('created_until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }
                ),
            ])
            ->actions([

            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),

                BulkAction::make('exportPdf')
                    ->label('Згенерувати PDF та відправити на пошту')
                    ->icon('heroicon-o-document-text')
                    ->action(function (Collection $records) {
                        foreach ($records as $record) {
                            GenerateContractPdf::dispatch($record);
                        }
                    }),
            ])
            ->searchable();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAcceptedOrders::route('/'),
            'edit' => Pages\EditAcceptedOrders::route('/{record}/edit'),
        ];
    }
}
