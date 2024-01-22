<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CR_Module extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_modules';

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

    public function customers()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id');
    }

    public function cr_workstations()
    {
        return $this->hasMany(CR_Workstations::class, 'fk_cr_modules_id');
    }

    public function cr_categories_products()
    {
        return $this->hasMany(CR_Categories_Products::class, 'fk_cr_modules_id')->orderBy('order');
    }

    public function cr_dishes()
    {
        return $this->hasMany(CR_Dishes::class, 'fk_cr_modules_id');
    }

    public function cr_payment_methods()
    {
        return $this->hasMany(CR_PaymentMethods::class, 'fk_cr_modules_id');
    }

    public static function boot()
    {
        parent::boot();

        static::created(function (CR_Module $module) {
            $workstation = new CR_Workstations();
            $workstation->name = 'Pending assignement';
            $workstation->fk_cr_modules_id = $module->id;
            $workstation->save();

            $category = new CR_Categories_Products();
            $category->name = 'No category';
            $category->order = 0;
            $category->fk_cr_modules_id = $module->id;
            $category->save();

            $dish = new CR_Dishes();
            $dish->name = 'No dish';
            $dish->unit = 'pce';
            $dish->is_consigned = false;
            $dish->is_soldSeparately = false;
            $dish->fk_cr_modules_id = $module->id;
            $dish->save();

            $paymentMethodsData = [
                'Cash' => storage_path('/app/public/medias/paymentMethod-pictures/cash.png'),
                'Cards' => storage_path('/app/public/medias/paymentMethod-pictures/creditcards.png'),
                'Twint' => storage_path('/app/public/medias/paymentMethod-pictures/twint.png')
            ];
            foreach ($paymentMethodsData as $paymentMethodName => $imagePath) {
                $paymentMethod = new CR_PaymentMethods();
                $paymentMethod->name = $paymentMethodName;
                $paymentMethod->fk_cr_modules_id = $module->id;
                $paymentMethod->save();

                $paymentMethod->addMedia($imagePath)
                    ->usingFileName(basename($imagePath))
                    ->preservingOriginal()
                    ->toMediaCollection('paymentMethod-pictures');
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function isOwnedBy(Customer $customer): bool
    {
        return $this->fk_customer_id === $customer->id;
    }

    public function registerMediaConversions(Media $media = null): void // FIXME: format png without transparency
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Crop, 300, 300)
            ->format('png')
            ->nonQueued();
    }

    public function getPosterUrl($conversion = '')
    {
        $poster = $this->getFirstMediaUrl('posters', $conversion);

        if ($poster) {
            return $poster;
        }

        return '/storage/medias/posters/default-poster.png';
    }

    public function uploadPoster($poster)
    {
        $this->clearMediaCollection('posters');

        $this->addMedia($poster)
            ->usingFileName($poster->hashName())
            ->toMediaCollection('posters');
    }
}
