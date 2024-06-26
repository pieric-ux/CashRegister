<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CR_Products extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'unit',
        'client_price',
        'cost_price',
        'fk_categories_products_id',
        'fk_dishes_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'fk_categories_products_id',
        'fk_dishes_id',
    ];

    public function cr_categories_products()
    {
        return $this->belongsTo(CR_Categories_Products::class, 'fk_categories_products_id');
    }

    public function cr_dishes()
    {
        return $this->belongsTo(CR_Dishes::class, 'fk_dishes_id');
    }

    public function cr_workstations()
    {
        return $this->belongsToMany(CR_Workstations::class, 'cr_workstations_products', 'fk_products_id', 'fk_workstations_id');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 150, 150)
            ->format('png')
            ->nonQueued();
    }

    public function getPictureUrl($conversion = '')
    {
        $picture = $this->getFirstMediaUrl('products-pictures', $conversion);

        return $picture;
    }

    public function uploadProductPicture($picture)
    {
        $this->clearMediaCollection('products-pictures');

        $this->addMedia($picture)
            ->usingFileName($picture->hashName())
            ->toMediaCollection('products-pictures');
    }
}
