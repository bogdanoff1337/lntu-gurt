<?php
//
//namespace App\Filament\Resources\UserResource\Pages;
//
//use App\Filament\Resources\UserResource;
//use Filament\Resources\Pages\Page;
//use App\Models\User;
//use Filament\Forms\Contracts\HasForms;
//use Filament\Forms\Concerns\InteractsWithForms;
//use Filament\Forms\Form;
//class Users extends Page implements HasForms
//{
//    use InteractsWithForms;
//
//    public ?array $data = [];
//
//
//    protected static string $resource = UserResource::class;
//
//    protected static string $view = 'filament.resources.user-resource.pages.users';
//
//
//    public function mount(): void
//    {
//        $this->form->fill();
//    }
//
//    public function form(Form $form): Form
//    {
//        return $form
//            ->schema([
//                TextInput::make('name')
//                    ->required(),
//            ])
//            ->statePath('data');
//    }
//}
