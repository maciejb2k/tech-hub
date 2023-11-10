# Laravel - Backend

### Uruchomienie aplikacji

-   Tworzymy kopie pliku `.env.example`
-   Zmieniamy nazwę pliku z `.env copy.example` na `.env`
-   Jeżeli nie mamy utworzonej bazy danych to tworzymy ją pod nazwą `tech_hub` z kodowaniem `utf8mb4_general_ci`
-   wykonujemy polecenia - `composer install --no-interaction` - `php artisan migrate:refresh --seed` - `php artisan serve`
-   Początek URL do API: `localhost:8000/api/...`
