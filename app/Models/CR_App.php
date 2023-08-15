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

    public function customers()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id');
    }

    public function cr_workstations()
    {
        return $this->hasMany(CR_Workstations::class, 'fk_apps_id');
    }

    public function cr_categories_products()
    {
        return $this->hasMany(CR_Categories_Products::class, 'fk_apps_id')->orderBy('order');
    }

    public function cr_dishes()
    {
        return $this->hasMany(CR_Dishes::class, 'fk_apps_id');
    }

    public static function boot()
    {
        parent::boot();

        static::created(function (CR_App $app) {
            $workstation = new CR_Workstations();
            $workstation->name = 'Pending assignement';
            $workstation->fk_apps_id = $app->id;
            $workstation->save();

            $categorie = new CR_Categories_Products();
            $categorie->name = 'No category';
            $categorie->order = 0;
            $categorie->fk_apps_id = $app->id;
            $categorie->save();

            $categorie = new CR_Dishes();
            $categorie->name = 'No dish';
            $categorie->unit = 'pce';
            $categorie->is_consigned = false;
            $categorie->is_SoldSeparately = false;
            $categorie->fk_apps_id = $app->id;
            $categorie->save();
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

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->nonQueued();
    }

    public function getPosterUrl()
    {
        $poster = $this->getFirstMediaUrl('posters');

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
