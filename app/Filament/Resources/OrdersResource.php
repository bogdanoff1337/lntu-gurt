<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdersResource\Pages;
use App\Filament\Resources\OrdersResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
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
            ->columns([
                Tables\Columns\TextColumn::make("student.email")
                    ->label("Студент/вступник")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make("room.number")
                    ->label("Кімната")
                    ->searchable()
                    ->sortable(),
                Tables\Columns\SelectColumn::make("status")
                    ->options([
                        'new' => 'Нове',
                        'approved' => 'Затверджено',
                        'rejected' => 'Відхилено',
                    ])
                    ->label("Статус"),
            ])
            ->filters([
                //
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
