<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CR_Dishes extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_dishes';

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
        'is_consigned',
        'is_soldSeparately',
        'fk_cr_modules_id',
    ];

     /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'fk_cr_modules_id',
    ];

    public function cr_modules()
    {
        return $this->belongsTo(CR_Module::class, 'fk_cr_modules_id');
    }

    public function cr_products()
    {
        return $this->hasMany(CR_Products::class, 'fk_dishes_id');
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
        return $this->getFirstMediaUrl('dishes-pictures', $conversion);
    }

    public function uploadDishPicture($picture)
    {
        $this->clearMediaCollection('dishes-pictures');

        $this->addMedia($picture)
            ->usingFileName($picture->hashName())
            ->toMediaCollection('dishes-pictures');
    }
}
