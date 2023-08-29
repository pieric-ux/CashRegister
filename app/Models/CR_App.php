<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CR_App extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_apps';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'website',
        'fk_customer_id',
    ];

    // Relationship with Customer model
    public function customers()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id');
    }

    //Relationship with CR_Workstations model
    public function cr_workstations()
    {
        return $this->hasMany(CR_Workstations::class, 'fk_apps_id');
    }

    //Relationship with CR_Categories_Products model
    public function cr_categories_products()
    {
        return $this->hasMany(CR_Categories_Products::class, 'fk_apps_id')->orderBy('order');
    }

    //Relationship with CR_Dishes model
    public function cr_dishes()
    {
        return $this->hasMany(CR_Dishes::class, 'fk_apps_id');
    }

    //Relationship with CR_PaymentMethods model
    public function cr_payment_methods()
    {
        return $this->hasMany(CR_PaymentMethods::class, 'fk_apps_id');
    }

    // Boot method to create initial related records when a new CR_App is created
    public static function boot()
    {
        parent::boot();

        static::created(function (CR_App $app) {
            // Create a default CR_Workstations
            $workstation = new CR_Workstations();
            $workstation->name = 'Pending assignement';
            $workstation->fk_apps_id = $app->id;
            $workstation->save();

            // Create a default CR_Categories_Products
            $category = new CR_Categories_Products();
            $category->name = 'No category';
            $category->order = 0;
            $category->fk_apps_id = $app->id;
            $category->save();

            // Create a default CR_Dishes
            $dish = new CR_Dishes();
            $dish->name = 'No dish';
            $dish->unit = 'pce';
            $dish->is_consigned = false;
            $dish->is_SoldSeparately = false;
            $dish->fk_apps_id = $app->id;
            $dish->save();

            // Create default CR_PaymentMethods with associated images
            $paymentMethodsData = [
                'Cash' => storage_path('/app/public/medias/paymentMethod-pictures/cash.png'),
                'Cards' => storage_path('/app/public/medias/paymentMethod-pictures/creditcards.png'),
                'Twint' => storage_path('/app/public/medias/paymentMethod-pictures/twint.png')
            ];
            foreach ($paymentMethodsData as $paymentMethodName => $imagePath) {
                $paymentMethod = new CR_PaymentMethods();
                $paymentMethod->name = $paymentMethodName;
                $paymentMethod->fk_apps_id = $app->id;
                $paymentMethod->save();

                $paymentMethod->addMedia($imagePath)
                    ->usingFileName(basename($imagePath))
                    ->preservingOriginal()
                    ->toMediaCollection('paymentMethod-pictures');
            }
        });
    }

    // Retrieve route key name for slug-based route model binding
    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Check if the CR_App is owned by a specific Customer
    public function isOwnedBy(Customer $customer): bool
    {
        return $this->fk_customer_id === $customer->id;
    }

    // Register media conversions for media items
    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->format(Manipulations::FORMAT_PNG)
            ->nonQueued();
    }

    // Get URL of the poster image for the CR_App
    public function getPosterUrl($conversion = '')
    {
        $poster = $this->getFirstMediaUrl('posters', $conversion);

        if ($poster) {
            return $poster;
        }

        return '/storage/medias/posters/default-poster.png';
    }

    // Upload a new poster image for the CR_App
    public function uploadPoster($poster)
    {
        $this->clearMediaCollection('posters');

        $this->addMedia($poster)
            ->usingFileName($poster->hashName())
            ->toMediaCollection('posters');
    }
}
