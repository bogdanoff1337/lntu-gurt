<x-filament-panels::page>
        <form wire:submit.prevent="submit">
            {{ $this->form }}

            <x-filament-support::button type="submit" class="mt-4">
                Save
            </x-filament-support::button>
        </form>
        Winners form will be here
</x-filament-panels::page>
