<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Order;
use App\Observers\OrderObserver;
use Illuminate\Routing\UrlGenerator;
use App\Models\Student;
use App\Observers\StudentProfileObserver;
use App\Services\Auth\StudentAuthService;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(StudentAuthService::class, function ($app) {
            return new StudentAuthService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        if (env('APP_ENV') == 'production') {
            $url->forceScheme('https');
        }

        Order::observe(OrderObserver::class);
        Student::observe(StudentProfileObserver::class);
    }
}
